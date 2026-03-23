import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, Loader2, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { OrderCategory } from "../backend.d";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSubmitOrder } from "../hooks/useQueries";

const CATEGORY_LABELS: Record<string, { label: string; description: string }> =
  {
    livingRoom: {
      label: "Living Room",
      description:
        "Create a welcoming, stylish living space tailored to your personality.",
    },
    bedroom: {
      label: "Bedroom",
      description:
        "Design your perfect sanctuary — peaceful, luxurious, and uniquely yours.",
    },
    kitchen: {
      label: "Kitchen",
      description:
        "Blend functionality with beauty in a kitchen that inspires creativity.",
    },
    bathroom: {
      label: "Bathroom",
      description:
        "Elevate your daily routine with a spa-inspired bathroom retreat.",
    },
    office: {
      label: "Office",
      description:
        "Boost productivity with a professionally designed workspace.",
    },
  };

const CATEGORY_MAP: Record<string, OrderCategory> = {
  livingRoom: OrderCategory.livingRoom,
  bedroom: OrderCategory.bedroom,
  kitchen: OrderCategory.kitchen,
  bathroom: OrderCategory.bathroom,
  office: OrderCategory.office,
};

const BUDGET_OPTIONS = [
  { value: "Under ₹50K", label: "Under ₹50,000" },
  { value: "₹50K-1L", label: "₹50,000 – ₹1,00,000" },
  { value: "₹1L-3L", label: "₹1,00,000 – ₹3,00,000" },
  { value: "₹3L+", label: "Above ₹3,00,000" },
];

export default function OrderPage() {
  const { category } = useParams({ from: "/order/$category" });
  const { login, loginStatus, identity } = useInternetIdentity();
  const submitOrder = useSubmitOrder();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    budget: "",
    notes: "",
  });
  const [orderId, setOrderId] = useState<bigint | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categoryInfo = CATEGORY_LABELS[category] ?? CATEGORY_LABELS.livingRoom;
  const orderCategory = CATEGORY_MAP[category] ?? OrderCategory.livingRoom;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.phone.trim() || !/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Valid 10-digit phone number required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      newErrors.email = "Valid email address required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.budget) newErrors.budget = "Please select a budget range";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!identity) {
      await login();
      return;
    }
    const id = await submitOrder.mutateAsync({
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      category: orderCategory,
      budget: form.budget,
      notes: form.notes,
    });
    setOrderId(id);
  };

  const update =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  if (orderId !== null) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full text-center"
            data-ocid="order.success_state"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Order Submitted!
            </h2>
            <p className="text-muted-foreground mb-2">
              Your {categoryInfo.label} design order has been received
              successfully.
            </p>
            <p className="text-sm text-primary font-semibold mb-8">
              Order ID: #{orderId.toString()}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Our team will contact you shortly at <strong>{form.phone}</strong>{" "}
              to discuss your project in detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Button>
              </Link>
              <a href="tel:9702930363">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Phone className="mr-2 h-4 w-4" /> Call: 9702930363
                </Button>
              </a>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              data-ocid="order.link"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>

            <div className="mb-8">
              <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
                Place Your Order
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1">
                {categoryInfo.label} Design Order
              </h1>
              <p className="text-muted-foreground mt-2">
                {categoryInfo.description}
              </p>
            </div>

            <Card className="border-border shadow-card">
              <CardHeader className="border-b border-border pb-5">
                <CardTitle className="font-display text-xl font-bold text-foreground">
                  Fill in Your Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {!identity && (
                  <div
                    className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6"
                    data-ocid="order.panel"
                  >
                    <p className="text-sm text-foreground mb-3">
                      Please log in to submit your order securely.
                    </p>
                    <Button
                      onClick={login}
                      disabled={loginStatus === "logging-in"}
                      className="bg-primary hover:bg-primary/90 text-white"
                      data-ocid="order.primary_button"
                    >
                      {loginStatus === "logging-in" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Logging in...
                        </>
                      ) : (
                        "Login to Continue"
                      )}
                    </Button>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="order.panel"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={update("name")}
                        className={errors.name ? "border-destructive" : ""}
                        data-ocid="order.input"
                      />
                      {errors.name && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="order.error_state"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        placeholder="10-digit mobile number"
                        value={form.phone}
                        onChange={update("phone")}
                        className={errors.phone ? "border-destructive" : ""}
                        data-ocid="order.input"
                      />
                      {errors.phone && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="order.error_state"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={update("email")}
                      className={errors.email ? "border-destructive" : ""}
                      data-ocid="order.input"
                    />
                    {errors.email && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="order.error_state"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Full Address *
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete address"
                      value={form.address}
                      onChange={update("address")}
                      className={errors.address ? "border-destructive" : ""}
                      rows={3}
                      data-ocid="order.textarea"
                    />
                    {errors.address && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="order.error_state"
                      >
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">
                        Design Category
                      </Label>
                      <div className="h-10 px-3 flex items-center bg-muted rounded-md border border-border text-sm font-medium text-foreground">
                        {categoryInfo.label}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">
                        Budget Range *
                      </Label>
                      <Select
                        value={form.budget}
                        onValueChange={(val) =>
                          setForm((prev) => ({ ...prev, budget: val }))
                        }
                      >
                        <SelectTrigger
                          className={errors.budget ? "border-destructive" : ""}
                          data-ocid="order.select"
                        >
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {BUDGET_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.budget && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="order.error_state"
                        >
                          {errors.budget}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="notes" className="text-sm font-medium">
                      Special Requirements
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific requirements, style preferences, materials, etc."
                      value={form.notes}
                      onChange={update("notes")}
                      rows={4}
                      data-ocid="order.textarea"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-semibold"
                    disabled={submitOrder.isPending}
                    data-ocid="order.submit_button"
                  >
                    {submitOrder.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                        Submitting Order...
                      </>
                    ) : identity ? (
                      "Submit Design Order"
                    ) : (
                      "Login & Submit Order"
                    )}
                  </Button>

                  {submitOrder.isError && (
                    <p
                      className="text-sm text-destructive text-center"
                      data-ocid="order.error_state"
                    >
                      Failed to submit order. Please try again.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              Need help? Call us at{" "}
              <a
                href="tel:9702930363"
                className="text-primary font-semibold hover:underline"
              >
                9702930363
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
