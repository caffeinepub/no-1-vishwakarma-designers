import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { OrderCategory, OrderStatus } from "../backend.d";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  useDeleteOrder,
  useGetAllOrders,
  useUpdateOrderStatus,
} from "../hooks/useQueries";

const ADMIN_PASSWORD = "vishwakarma enterprise";

const STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: "bg-yellow-100 text-yellow-800 border-yellow-200",
  [OrderStatus.inProgress]: "bg-blue-100 text-blue-800 border-blue-200",
  [OrderStatus.completed]: "bg-green-100 text-green-800 border-green-200",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: "Pending",
  [OrderStatus.inProgress]: "In Progress",
  [OrderStatus.completed]: "Completed",
};

const CATEGORY_LABELS: Record<OrderCategory, string> = {
  [OrderCategory.livingRoom]: "Living Room",
  [OrderCategory.bedroom]: "Bedroom",
  [OrderCategory.kitchen]: "Kitchen",
  [OrderCategory.bathroom]: "Bathroom",
  [OrderCategory.office]: "Office",
  [OrderCategory.modularWork]: "Modular Work",
  [OrderCategory.modularWardrobe]: "Modular Wardrobe",
  [OrderCategory.lighting]: "Lighting Design",
  [OrderCategory.flooring]: "Flooring",
  [OrderCategory.electricalWork]: "Electrical Work",
  [OrderCategory.civilWork]: "Civil Work",
  [OrderCategory.falseCeiling]: "False Ceiling",
  [OrderCategory.wallDesign]: "Wall Design",
  [OrderCategory.painting]: "Painting",
};

function exportToCSV(orders: any[]) {
  const headers = [
    "Order ID",
    "Date",
    "Customer Name",
    "Phone",
    "Email",
    "Address",
    "Service",
    "Budget",
    "Notes",
    "Status",
  ];
  const rows = orders.map((o) => [
    `#${o.id.toString()}`,
    new Date(Number(o.timestamp) / 1_000_000).toLocaleDateString("en-IN"),
    o.name,
    o.phone,
    o.email,
    o.address,
    CATEGORY_LABELS[o.category as OrderCategory] ?? o.category,
    o.budget,
    o.notes,
    STATUS_LABELS[o.status as OrderStatus] ?? o.status,
  ]);
  const csv = [headers, ...rows]
    .map((row) =>
      row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `vishwakarma-orders-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const ordersQuery = useGetAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();

  const [updatingId, setUpdatingId] = useState<bigint | null>(null);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [expandedId, setExpandedId] = useState<bigint | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      await updateStatus.mutateAsync({ orderId, status });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (orderId: bigint) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    setDeletingId(orderId);
    try {
      await deleteOrder.mutateAsync(orderId);
    } finally {
      setDeletingId(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full"
          >
            <div className="bg-white border border-border rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Admin Login
                </h2>
                <p className="text-muted-foreground text-sm mt-2">
                  Vishwakarma Design Studio — Admin Panel
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className={`pr-10 ${error ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-1.5">{error}</p>
                  )}
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5"
                  data-ocid="admin.primary_button"
                >
                  Login to Admin Panel
                </Button>
              </div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const allOrders = ordersQuery.data ?? [];

  // Compute top service
  const categoryCount: Record<string, number> = {};
  for (const o of allOrders) {
    categoryCount[o.category] = (categoryCount[o.category] ?? 0) + 1;
  }
  const topCategory = Object.entries(categoryCount).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0] as OrderCategory | undefined;

  // Filter orders
  const filtered = allOrders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.name.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.email.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    const matchCategory =
      filterCategory === "all" || o.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
                  Dashboard
                </span>
                <h1 className="font-display text-3xl font-bold text-foreground mt-1">
                  Admin Panel
                </h1>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => exportToCSV(allOrders)}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  disabled={allOrders.length === 0}
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setPassword("");
                  }}
                  variant="outline"
                  className="border-border text-muted-foreground hover:text-foreground"
                  data-ocid="admin.secondary_button"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[
                { label: "Total Orders", value: allOrders.length },
                {
                  label: "Pending",
                  value: allOrders.filter(
                    (o) => o.status === OrderStatus.pending,
                  ).length,
                },
                {
                  label: "In Progress",
                  value: allOrders.filter(
                    (o) => o.status === OrderStatus.inProgress,
                  ).length,
                },
                {
                  label: "Completed",
                  value: allOrders.filter(
                    (o) => o.status === OrderStatus.completed,
                  ).length,
                },
                {
                  label: "Top Service",
                  value: topCategory ? CATEGORY_LABELS[topCategory] : "--",
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="bg-white border border-border rounded-xl p-4 shadow-card"
                  data-ocid={`admin.card.${i + 1}`}
                >
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="font-display text-xl font-bold text-foreground mt-1 leading-tight">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Search & Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Input
                id="admin-password"
                placeholder="Search by name, phone, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-72"
              />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value={OrderStatus.pending}>Pending</SelectItem>
                  <SelectItem value={OrderStatus.inProgress}>
                    In Progress
                  </SelectItem>
                  <SelectItem value={OrderStatus.completed}>
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(search ||
                filterStatus !== "all" ||
                filterCategory !== "all") && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearch("");
                    setFilterStatus("all");
                    setFilterCategory("all");
                  }}
                  className="text-muted-foreground text-sm"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Orders Table */}
            {ordersQuery.isLoading ? (
              <div
                className="flex justify-center py-16"
                data-ocid="admin.loading_state"
              >
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="text-center py-16 text-muted-foreground"
                data-ocid="admin.empty_state"
              >
                <p className="text-lg font-medium">
                  {allOrders.length === 0
                    ? "No orders yet"
                    : "No orders match your filters"}
                </p>
                <p className="text-sm mt-1">
                  {allOrders.length === 0
                    ? "Orders will appear here once customers submit them."
                    : "Try adjusting the search or filters."}
                </p>
              </div>
            ) : (
              <div
                className="bg-white border border-border rounded-xl shadow-card overflow-hidden"
                data-ocid="admin.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary">
                      <TableHead className="w-8" />
                      <TableHead className="font-semibold text-foreground">
                        Order ID
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Customer
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Phone
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Service
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Budget
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Date
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Update
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((order, idx) => {
                      const isExpanded = expandedId === order.id;
                      const date = new Date(
                        Number(order.timestamp) / 1_000_000,
                      ).toLocaleDateString("en-IN");
                      return (
                        <>
                          <TableRow
                            key={order.id.toString()}
                            className="cursor-pointer hover:bg-secondary/40"
                            data-ocid={`admin.row.${idx + 1}`}
                          >
                            <TableCell
                              onClick={() =>
                                setExpandedId(isExpanded ? null : order.id)
                              }
                              className="pl-4"
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              )}
                            </TableCell>
                            <TableCell className="font-mono text-xs text-muted-foreground">
                              #{order.id.toString()}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-foreground text-sm">
                                  {order.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {order.email}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              {order.phone}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {CATEGORY_LABELS[order.category]}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm font-medium">
                              {order.budget}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {date}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[order.status]}`}
                              >
                                {STATUS_LABELS[order.status]}
                              </span>
                            </TableCell>
                            <TableCell>
                              {updatingId === order.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                              ) : (
                                <Select
                                  value={order.status}
                                  onValueChange={(val) =>
                                    handleStatusChange(
                                      order.id,
                                      val as OrderStatus,
                                    )
                                  }
                                >
                                  <SelectTrigger
                                    className="w-36 text-xs"
                                    data-ocid={`admin.select.${idx + 1}`}
                                  >
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={OrderStatus.pending}>
                                      Pending
                                    </SelectItem>
                                    <SelectItem value={OrderStatus.inProgress}>
                                      In Progress
                                    </SelectItem>
                                    <SelectItem value={OrderStatus.completed}>
                                      Completed
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </TableCell>
                            <TableCell>
                              {deletingId === order.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                              ) : (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDelete(order.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                          {isExpanded && (
                            <TableRow
                              key={`${order.id.toString()}-detail`}
                              className="bg-amber-50/50"
                            >
                              <TableCell colSpan={10} className="px-6 py-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                      Address
                                    </p>
                                    <p className="text-foreground">
                                      {order.address || "--"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                      Notes / Requirements
                                    </p>
                                    <p className="text-foreground">
                                      {order.notes || "--"}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
