import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Loader2, LogIn, LogOut, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { OrderCategory, OrderStatus } from "../backend.d";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetAllOrders,
  useIsAdmin,
  useUpdateOrderStatus,
} from "../hooks/useQueries";

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
};

export default function AdminPage() {
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const isAdminQuery = useIsAdmin();
  const ordersQuery = useGetAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const [updatingId, setUpdatingId] = useState<bigint | null>(null);

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      await updateStatus.mutateAsync({ orderId, status });
    } finally {
      setUpdatingId(null);
    }
  };

  if (!identity) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Admin Access Required
            </h2>
            <p className="text-muted-foreground mb-8">
              Please log in with your admin account to access the dashboard.
            </p>
            <Button
              onClick={login}
              disabled={loginStatus === "logging-in"}
              className="bg-primary hover:bg-primary/90 text-white px-8"
              data-ocid="admin.primary_button"
            >
              {loginStatus === "logging-in" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging
                  in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Login to Admin
                </>
              )}
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isAdminQuery.isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-24">
          <div
            className="flex items-center gap-3 text-muted-foreground"
            data-ocid="admin.loading_state"
          >
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Verifying admin access...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdminQuery.data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-24 px-4">
          <div
            className="max-w-md w-full text-center"
            data-ocid="admin.error_state"
          >
            <ShieldAlert className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Access Denied
            </h2>
            <p className="text-muted-foreground mb-6">
              You do not have admin privileges to access this page.
            </p>
            <Button
              onClick={clear}
              variant="outline"
              className="border-primary text-primary"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const orders = ordersQuery.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
                  Dashboard
                </span>
                <h1 className="font-display text-3xl font-bold text-foreground mt-1">
                  Admin Panel
                </h1>
              </div>
              <Button
                onClick={clear}
                variant="outline"
                className="border-border text-muted-foreground hover:text-foreground"
                data-ocid="admin.secondary_button"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {[
                { label: "Total Orders", value: orders.length },
                {
                  label: "Pending",
                  value: orders.filter((o) => o.status === OrderStatus.pending)
                    .length,
                },
                {
                  label: "In Progress",
                  value: orders.filter(
                    (o) => o.status === OrderStatus.inProgress,
                  ).length,
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="bg-white border border-border rounded-xl p-5 shadow-card"
                  data-ocid={`admin.card.${i + 1}`}
                >
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-display text-3xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Orders Table */}
            {ordersQuery.isLoading ? (
              <div
                className="flex justify-center py-16"
                data-ocid="admin.loading_state"
              >
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : orders.length === 0 ? (
              <div
                className="text-center py-16 text-muted-foreground"
                data-ocid="admin.empty_state"
              >
                <p className="text-lg font-medium">No orders yet</p>
                <p className="text-sm mt-1">
                  Orders will appear here once customers submit them.
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
                        Category
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Budget
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Update Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order, idx) => (
                      <TableRow
                        key={order.id.toString()}
                        data-ocid={`admin.row.${idx + 1}`}
                      >
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
                        <TableCell className="text-sm">{order.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {CATEGORY_LABELS[order.category]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {order.budget}
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
                                handleStatusChange(order.id, val as OrderStatus)
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
                      </TableRow>
                    ))}
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
