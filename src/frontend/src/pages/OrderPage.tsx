import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  IndianRupee,
  Loader2,
  Phone,
  Shield,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { OrderCategory } from "../backend.d";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSubmitOrder } from "../hooks/useQueries";

const CATEGORY_LABELS: Record<
  string,
  { label: string; description: string; inclusions: string[] }
> = {
  livingRoom: {
    label: "Living Room",
    description:
      "Create a welcoming, stylish living space tailored to your personality.",
    inclusions: [
      "Custom furniture layout & selection",
      "Accent wall & lighting design",
      "Soft furnishings & decor curation",
      "3D visualization before execution",
    ],
  },
  bedroom: {
    label: "Bedroom",
    description:
      "Design your perfect sanctuary — peaceful, luxurious, and uniquely yours.",
    inclusions: [
      "Wardrobe & storage design",
      "Bed frame & upholstery selection",
      "Ambient & task lighting plan",
      "Color palette & material finishes",
    ],
  },
  kitchen: {
    label: "Kitchen",
    description:
      "Blend functionality with beauty in a kitchen that inspires creativity.",
    inclusions: [
      "Modular cabinet layout & design",
      "Countertop & backsplash selection",
      "Appliance placement planning",
      "Plumbing & electrical coordination",
    ],
  },
  bathroom: {
    label: "Bathroom",
    description:
      "Elevate your daily routine with a spa-inspired bathroom retreat.",
    inclusions: [
      "Sanitary ware selection & placement",
      "Tile design & waterproofing",
      "Vanity & storage solutions",
      "Lighting & ventilation planning",
    ],
  },
  office: {
    label: "Office",
    description: "Boost productivity with a professionally designed workspace.",
    inclusions: [
      "Ergonomic furniture selection",
      "Cable management & tech setup",
      "Acoustic & lighting optimization",
      "Brand-aligned aesthetics",
    ],
  },
  modularWork: {
    label: "Modular Work",
    description:
      "Custom modular furniture and fittings designed to maximize your space.",
    inclusions: [
      "Custom modular unit design",
      "Premium hardware & fittings",
      "Space optimization planning",
      "Professional installation",
    ],
  },
  modularWardrobe: {
    label: "Modular Wardrobe",
    description:
      "Sleek modular wardrobes with smart storage solutions for every room.",
    inclusions: [
      "Interior compartment design",
      "Soft-close hinges & drawer systems",
      "Mirror & lighting integration",
      "Custom finish options",
    ],
  },
  lighting: {
    label: "Lighting Design",
    description:
      "Ambient, task, and accent lighting to transform the mood of any space.",
    inclusions: [
      "Layered lighting plan",
      "Energy-efficient LED solutions",
      "Smart dimmer controls",
      "Chandelier & fixture selection",
    ],
  },
  flooring: {
    label: "Flooring",
    description:
      "Premium flooring options — tiles, marble, wood, and more for every style.",
    inclusions: [
      "Material selection & sampling",
      "Pattern & layout design",
      "Subfloor preparation",
      "Professional installation & grouting",
    ],
  },
  electricalWork: {
    label: "Electrical Work",
    description:
      "Safe, professional electrical fittings and wiring for modern interiors.",
    inclusions: [
      "Point layout planning",
      "Concealed conduit wiring",
      "MCB & safety board setup",
      "Modular switch & socket fitting",
    ],
  },
  civilWork: {
    label: "Civil Work",
    description:
      "Structural and civil modifications handled by expert craftsmen.",
    inclusions: [
      "Partition & demolition work",
      "Plastering & surface leveling",
      "Waterproofing & sealing",
      "Expert structural consultation",
    ],
  },
  falseCeiling: {
    label: "False Ceiling",
    description:
      "Elegant false ceiling designs with lighting integration for a premium look.",
    inclusions: [
      "Gypsum / POP / grid ceiling design",
      "Cove & recessed lighting",
      "AC duct concealment",
      "Custom shape & profile options",
    ],
  },
  wallDesign: {
    label: "Wall Design",
    description:
      "Textured finishes, panels, and feature walls that define your space.",
    inclusions: [
      "Texture & panel selection",
      "Wallpaper & veneer options",
      "Backlit & 3D panel designs",
      "Expert installation & finishing",
    ],
  },
  painting: {
    label: "Painting",
    description:
      "Premium interior painting with expert color consultation included.",
    inclusions: [
      "Professional color consultation",
      "Premium paint brands",
      "Surface preparation & priming",
      "Clean, streak-free finish",
    ],
  },
};

const CATEGORY_PRICES: Record<string, { min: string; max: string }> = {
  modularWork: { min: "₹80,000", max: "₹3,00,000" },
  modularWardrobe: { min: "₹40,000", max: "₹1,50,000" },
  lighting: { min: "₹20,000", max: "₹80,000" },
  flooring: { min: "₹60,000", max: "₹2,50,000" },
  electricalWork: { min: "₹30,000", max: "₹1,20,000" },
  civilWork: { min: "₹50,000", max: "₹5,00,000" },
  falseCeiling: { min: "₹40,000", max: "₹1,80,000" },
  wallDesign: { min: "₹25,000", max: "₹1,00,000" },
  painting: { min: "₹15,000", max: "₹60,000" },
  livingRoom: { min: "₹1,00,000", max: "₹5,00,000" },
  bedroom: { min: "₹80,000", max: "₹3,50,000" },
  kitchen: { min: "₹1,20,000", max: "₹6,00,000" },
  bathroom: { min: "₹60,000", max: "₹2,50,000" },
  office: { min: "₹90,000", max: "₹4,00,000" },
};

const CATEGORY_MAP: Record<string, OrderCategory> = {
  livingRoom: OrderCategory.livingRoom,
  bedroom: OrderCategory.bedroom,
  kitchen: OrderCategory.kitchen,
  bathroom: OrderCategory.bathroom,
  office: OrderCategory.office,
  modularWork: OrderCategory.modularWork,
  modularWardrobe: OrderCategory.modularWardrobe,
  lighting: OrderCategory.lighting,
  flooring: OrderCategory.flooring,
  electricalWork: OrderCategory.electricalWork,
  civilWork: OrderCategory.civilWork,
  falseCeiling: OrderCategory.falseCeiling,
  wallDesign: OrderCategory.wallDesign,
  painting: OrderCategory.painting,
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
  const priceRange = CATEGORY_PRICES[category] ?? CATEGORY_PRICES.livingRoom;
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
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "oklch(0.72 0.17 55 / 0.15)" }}
            >
              <CheckCircle
                className="h-10 w-10"
                style={{ color: "oklch(0.72 0.17 55)" }}
              />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Order Submitted!
            </h2>
            <p className="text-muted-foreground mb-2">
              Your {categoryInfo.label} design order has been received
              successfully.
            </p>
            <p
              className="text-sm font-semibold mb-8"
              style={{ color: "oklch(0.72 0.17 55)" }}
            >
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
                <Button
                  className="text-white"
                  style={{ background: "oklch(0.72 0.17 55)" }}
                >
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
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              data-ocid="order.link"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* LEFT PANEL — sticky service info */}
            <motion.div
              className="lg:col-span-2 lg:sticky lg:top-24"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.14 0.055 255), oklch(0.18 0.06 255))",
                  boxShadow: "0 8px 40px oklch(0.12 0.05 255 / 0.45)",
                }}
              >
                {/* Top accent bar */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.72 0.17 55), oklch(0.82 0.14 65), oklch(0.72 0.17 55))",
                  }}
                />

                <div className="p-7">
                  {/* Eyebrow */}
                  <span
                    className="text-xs font-bold tracking-[0.3em] uppercase"
                    style={{ color: "oklch(0.72 0.17 55)" }}
                  >
                    Service Details
                  </span>

                  {/* Service name */}
                  <h1
                    className="font-display text-2xl md:text-3xl font-bold mt-2 mb-3 leading-tight"
                    style={{ color: "oklch(0.97 0.01 60)" }}
                  >
                    {categoryInfo.label}
                  </h1>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "oklch(0.72 0.02 255)" }}
                  >
                    {categoryInfo.description}
                  </p>

                  <Separator
                    className="mb-6"
                    style={{ background: "oklch(0.72 0.17 55 / 0.25)" }}
                  />

                  {/* Price range — gold highlight */}
                  <div
                    className="rounded-xl p-4 mb-6"
                    style={{ background: "oklch(0.72 0.17 55 / 0.12)" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <IndianRupee
                        className="h-4 w-4"
                        style={{ color: "oklch(0.72 0.17 55)" }}
                      />
                      <span
                        className="text-xs font-bold tracking-wider uppercase"
                        style={{ color: "oklch(0.72 0.17 55)" }}
                      >
                        Estimated Cost
                      </span>
                    </div>
                    <div
                      className="font-display text-xl font-bold"
                      style={{ color: "oklch(0.87 0.14 60)" }}
                    >
                      {priceRange.min} – {priceRange.max}
                    </div>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "oklch(0.65 0.02 255)" }}
                    >
                      Final price varies by room size & material choice
                    </p>
                  </div>

                  {/* What's included */}
                  <div className="mb-6">
                    <h3
                      className="text-xs font-bold tracking-wider uppercase mb-3"
                      style={{ color: "oklch(0.72 0.17 55)" }}
                    >
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {categoryInfo.inclusions.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Star
                            className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 fill-current"
                            style={{ color: "oklch(0.72 0.17 55)" }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: "oklch(0.78 0.02 255)" }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator
                    className="mb-6"
                    style={{ background: "oklch(0.72 0.17 55 / 0.25)" }}
                  />

                  {/* Contact */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.72 0.17 55 / 0.15)" }}
                    >
                      <Phone
                        className="h-4 w-4"
                        style={{ color: "oklch(0.72 0.17 55)" }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.65 0.02 255)" }}
                      >
                        Need help? Call us
                      </p>
                      <a
                        href="tel:9702930363"
                        className="font-bold text-sm hover:underline transition-all"
                        style={{ color: "oklch(0.87 0.14 60)" }}
                      >
                        9702930363
                      </a>
                    </div>
                  </div>

                  {/* Warranty badge */}
                  <div
                    className="flex items-center gap-3 rounded-xl p-3"
                    style={{ background: "oklch(0.72 0.17 55 / 0.1)" }}
                  >
                    <Shield
                      className="h-7 w-7 flex-shrink-0"
                      style={{ color: "oklch(0.72 0.17 55)" }}
                    />
                    <div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "oklch(0.87 0.14 60)" }}
                      >
                        10-Year Warranty
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.65 0.02 255)" }}
                      >
                        Guaranteed quality & service
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT PANEL — form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-6">
                <span
                  className="text-xs font-bold tracking-[0.3em] uppercase"
                  style={{ color: "oklch(0.72 0.17 55)" }}
                >
                  Place Your Order
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-1">
                  Fill in Your Details
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Our team will review your requirements and get back to you
                  within 24 hours.
                </p>
              </div>

              <Card
                className="border-0 shadow-lg"
                style={{
                  boxShadow: "0 4px 32px oklch(0.12 0.05 255 / 0.12)",
                  borderTop: "2px solid oklch(0.72 0.17 55 / 0.6)",
                }}
              >
                <CardHeader className="pb-5">
                  <div className="flex items-center gap-3">
                    <Badge
                      className="text-xs font-semibold px-3 py-1"
                      style={{
                        background: "oklch(0.72 0.17 55 / 0.12)",
                        color: "oklch(0.55 0.14 55)",
                        border: "1px solid oklch(0.72 0.17 55 / 0.3)",
                      }}
                    >
                      {categoryInfo.label}
                    </Badge>
                    <CardTitle className="text-base font-semibold text-muted-foreground">
                      Order Form
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  {!identity && (
                    <div
                      className="rounded-xl p-4 mb-6 border"
                      style={{
                        background: "oklch(0.72 0.17 55 / 0.05)",
                        borderColor: "oklch(0.72 0.17 55 / 0.25)",
                      }}
                      data-ocid="order.panel"
                    >
                      <p className="text-sm text-foreground mb-3">
                        Please log in to submit your order securely.
                      </p>
                      <Button
                        onClick={login}
                        disabled={loginStatus === "logging-in"}
                        className="text-white"
                        style={{ background: "oklch(0.72 0.17 55)" }}
                        data-ocid="order.primary_button"
                      >
                        {loginStatus === "logging-in" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
                    {/* Section: Personal Info */}
                    <div>
                      <h3
                        className="text-xs font-bold tracking-widest uppercase mb-4"
                        style={{ color: "oklch(0.72 0.17 55)" }}
                      >
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="name"
                            className="text-sm font-semibold"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={update("name")}
                            className={`transition-all focus-visible:ring-0 ${
                              errors.name
                                ? "border-destructive"
                                : "focus-visible:border-[oklch(0.72_0.17_55)]"
                            }`}
                            style={{
                              borderColor: errors.name
                                ? undefined
                                : form.name
                                  ? "oklch(0.72 0.17 55 / 0.5)"
                                  : undefined,
                            }}
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
                          <Label
                            htmlFor="phone"
                            className="text-sm font-semibold"
                          >
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            placeholder="10-digit mobile number"
                            value={form.phone}
                            onChange={update("phone")}
                            className={`transition-all focus-visible:ring-0 ${
                              errors.phone ? "border-destructive" : ""
                            }`}
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
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={update("email")}
                        className={`transition-all focus-visible:ring-0 ${
                          errors.email ? "border-destructive" : ""
                        }`}
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

                    <Separator />

                    {/* Section: Project Details */}
                    <div>
                      <h3
                        className="text-xs font-bold tracking-widest uppercase mb-4"
                        style={{ color: "oklch(0.72 0.17 55)" }}
                      >
                        Project Details
                      </h3>

                      <div className="space-y-5">
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="address"
                            className="text-sm font-semibold"
                          >
                            Full Address *
                          </Label>
                          <Textarea
                            id="address"
                            placeholder="Enter your complete address"
                            value={form.address}
                            onChange={update("address")}
                            className={`transition-all focus-visible:ring-0 ${
                              errors.address ? "border-destructive" : ""
                            }`}
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
                            <Label className="text-sm font-semibold">
                              Design Category
                            </Label>
                            <div
                              className="h-10 px-3 flex items-center rounded-md border text-sm font-medium text-foreground"
                              style={{
                                background: "oklch(0.72 0.17 55 / 0.06)",
                                borderColor: "oklch(0.72 0.17 55 / 0.3)",
                                color: "oklch(0.55 0.14 55)",
                              }}
                            >
                              {categoryInfo.label}
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-sm font-semibold">
                              Budget Range *
                            </Label>
                            <Select
                              value={form.budget}
                              onValueChange={(val) =>
                                setForm((prev) => ({ ...prev, budget: val }))
                              }
                            >
                              <SelectTrigger
                                className={`focus:ring-0 ${
                                  errors.budget ? "border-destructive" : ""
                                }`}
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
                          <Label
                            htmlFor="notes"
                            className="text-sm font-semibold"
                          >
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
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-white py-6 text-base font-semibold rounded-xl transition-all hover:opacity-90 active:scale-[0.99]"
                      style={{ background: "oklch(0.72 0.17 55)" }}
                      disabled={submitOrder.isPending}
                      data-ocid="order.submit_button"
                    >
                      {submitOrder.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting Order...
                        </>
                      ) : identity ? (
                        "Submit Design Order →"
                      ) : (
                        "Login & Submit Order →"
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
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
