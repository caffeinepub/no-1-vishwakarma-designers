import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  Brush,
  CheckCircle,
  DoorOpen,
  Grid3x3,
  HardHat,
  Layers,
  Lightbulb,
  MessageCircle,
  PaintBucket,
  Phone,
  Quote,
  Star,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Header from "../components/Header";

const GOLD_GRADIENT_STATS = {
  background:
    "linear-gradient(135deg, oklch(0.82 0.16 52), oklch(0.70 0.20 42))",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

const LABEL_GOLD_STYLE = {
  background:
    "linear-gradient(135deg, oklch(0.75 0.18 52), oklch(0.62 0.22 42))",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
  display: "inline-block" as const,
};

const STEP_GOLD_BG = {
  background:
    "linear-gradient(135deg, oklch(0.72 0.18 52), oklch(0.60 0.22 42))",
};

const NAVY_HEADING = { color: "oklch(0.12 0.05 255)" };

const CATEGORIES = [
  {
    id: "livingRoom",
    title: "Living Room",
    description:
      "Create a welcoming, stylish living space tailored to your personality and lifestyle.",
    image: "/assets/generated/category-living-room.dim_600x400.jpg",
  },
  {
    id: "bedroom",
    title: "Bedroom",
    description:
      "Design your perfect sanctuary — peaceful, luxurious, and uniquely yours.",
    image: "/assets/generated/category-bedroom.dim_600x400.jpg",
  },
  {
    id: "kitchen",
    title: "Kitchen",
    description:
      "Blend functionality with beauty in a kitchen that inspires culinary creativity.",
    image: "/assets/generated/category-kitchen.dim_600x400.jpg",
  },
  {
    id: "bathroom",
    title: "Bathroom",
    description:
      "Elevate your daily routine with a spa-inspired bathroom retreat.",
    image: "/assets/generated/category-bathroom.dim_600x400.jpg",
  },
  {
    id: "office",
    title: "Office",
    description:
      "Boost productivity and impress clients with a professionally designed workspace.",
    image: "/assets/generated/category-office.dim_600x400.jpg",
  },
  {
    id: "modularWork",
    title: "Modular Work",
    description:
      "Custom modular furniture and fittings designed to maximize your space.",
    icon: Boxes,
    image: "/assets/generated/service-modular-work.dim_600x400.jpg",
  },
  {
    id: "modularWardrobe",
    title: "Modular Wardrobe",
    description:
      "Sleek modular wardrobes with smart storage solutions for every room.",
    icon: DoorOpen,
    image: "/assets/generated/service-modular-wardrobe.dim_600x400.jpg",
  },
  {
    id: "lighting",
    title: "Lighting Design",
    description:
      "Ambient, task, and accent lighting to transform the mood of any space.",
    icon: Lightbulb,
    image: "/assets/generated/service-lighting.dim_600x400.jpg",
  },
  {
    id: "flooring",
    title: "Flooring",
    description:
      "Premium flooring options — tiles, marble, wood, and more for every style.",
    icon: Grid3x3,
    image: "/assets/generated/service-flooring.dim_600x400.jpg",
  },
  {
    id: "electricalWork",
    title: "Electrical Work",
    description:
      "Safe, professional electrical fittings and wiring for modern interiors.",
    icon: Zap,
    image: "/assets/generated/service-electrical.dim_600x400.jpg",
  },
  {
    id: "civilWork",
    title: "Civil Work",
    description:
      "Structural and civil modifications handled by expert craftsmen.",
    icon: HardHat,
    image: "/assets/generated/service-civil.dim_600x400.jpg",
  },
  {
    id: "falseCeiling",
    title: "False Ceiling",
    description:
      "Elegant false ceiling designs with lighting integration for a premium look.",
    icon: Layers,
    image: "/assets/generated/service-false-ceiling.dim_600x400.jpg",
  },
  {
    id: "wallDesign",
    title: "Wall Design",
    description:
      "Textured finishes, panels, and feature walls that define your space.",
    icon: PaintBucket,
    image: "/assets/generated/service-wall-design.dim_600x400.jpg",
  },
  {
    id: "painting",
    title: "Painting",
    description:
      "Premium interior painting with expert color consultation included.",
    icon: Brush,
    image: "/assets/generated/service-painting.dim_600x400.jpg",
  },
];

const QUOTES = [
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    role: "Co-founder, Apple",
  },
  {
    text: "The details are not the details. They make the design.",
    author: "Charles Eames",
    role: "Legendary American Designer",
  },
  {
    text: "Good design is obvious. Great design is transparent.",
    author: "Joe Sparano",
    role: "Graphic Designer",
  },
  {
    text: "A room should never allow the eye to settle in one place. It should smile at you and create fantasy.",
    author: "Juan Montoya",
    role: "World-Renowned Interior Designer",
  },
];

const MECHANISM_IMAGES = [
  {
    src: "/assets/generated/mechanism-drawer-new.dim_600x400.jpg",
    label: "Luxury Soft-Close Drawers",
    desc: "Premium modular drawers with smooth soft-close mechanism.",
  },
  {
    src: "/assets/generated/mechanism-door-new.dim_600x400.jpg",
    label: "Premium Interior Doors",
    desc: "Elegant wooden doors with gold hardware for every room.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    rating: 5,
    comment:
      "Virendra transformed our living room completely. The quality of work and attention to detail is outstanding!",
    location: "Mumbai",
  },
  {
    name: "Priya Patel",
    rating: 5,
    comment:
      "Best interior designer! The kitchen design is exactly what we wanted. Soft-close drawers work perfectly.",
    location: "Pune",
  },
  {
    name: "Amit Desai",
    rating: 5,
    comment:
      "Professional service, excellent quality. Our bedroom looks like a 5-star hotel room now.",
    location: "Thane",
  },
  {
    name: "Sunita Mehta",
    rating: 4,
    comment:
      "Very happy with the office design. Everything is perfectly organized and looks great.",
    location: "Navi Mumbai",
  },
];

const WORK_STEPS = [
  {
    num: "01",
    icon: Phone,
    title: "Consultation",
    desc: "Tell us your vision, style preferences, and budget. We listen to every detail.",
  },
  {
    num: "02",
    icon: Star,
    title: "Design Planning",
    desc: "We create detailed 3D design plans tailored specifically to your space.",
  },
  {
    num: "03",
    icon: CheckCircle,
    title: "Quality Materials",
    desc: "Premium hardware and materials are sourced from the finest suppliers.",
  },
  {
    num: "04",
    icon: ArrowRight,
    title: "Perfect Installation",
    desc: "Expert installation with a satisfaction guarantee and after-service warranty.",
  },
];

function AnimatedCounter({
  target,
  suffix = "",
}: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${8 + i * 7.5}%`,
    delay: `${i * 0.4}s`,
    duration: `${3 + (i % 4)}s`,
    size: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: "oklch(0.82 0.16 52 / 0.5)",
            animation: `float-up ${p.duration} ${p.delay} infinite ease-in-out`,
            bottom: "10%",
          }}
        />
      ))}
    </div>
  );
}

function DrawerAnimation() {
  const drawers = [
    {
      anim: "drawer-slide-1",
      wood: "linear-gradient(180deg, oklch(0.44 0.10 52), oklch(0.30 0.07 52))",
    },
    {
      anim: "drawer-slide-2",
      wood: "linear-gradient(180deg, oklch(0.40 0.09 52), oklch(0.27 0.06 52))",
    },
    {
      anim: "drawer-slide-3",
      wood: "linear-gradient(180deg, oklch(0.46 0.11 54), oklch(0.32 0.08 52))",
    },
    {
      anim: "drawer-slide-4",
      wood: "linear-gradient(180deg, oklch(0.42 0.09 52), oklch(0.28 0.06 52))",
    },
  ];
  const interiorColors = [
    ["oklch(0.62 0.12 230)", "oklch(0.70 0.10 145)", "oklch(0.65 0.13 30)"],
    ["oklch(0.70 0.08 300)", "oklch(0.60 0.12 145)", "oklch(0.68 0.10 52)"],
    ["oklch(0.65 0.10 190)", "oklch(0.72 0.09 52)", "oklch(0.60 0.11 340)"],
    ["oklch(0.68 0.09 52)", "oklch(0.62 0.10 145)", "oklch(0.66 0.08 270)"],
  ];
  return (
    <div
      className="relative rounded-xl overflow-visible h-56 flex flex-col justify-center items-center"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.13 0.03 255), oklch(0.18 0.04 250))",
      }}
    >
      {/* Cabinet wrapper */}
      <div className="relative w-[160px]">
        {/* Crown / cornice */}
        <div
          className="w-full h-4 rounded-t-lg"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.55 0.12 52), oklch(0.38 0.08 52))",
            boxShadow: "0 2px 6px oklch(0 0 0 / 0.5)",
          }}
        />
        {/* Cabinet body */}
        <div
          className="w-full flex flex-col gap-[3px] p-[3px]"
          style={{
            background: "oklch(0.22 0.05 52)",
            borderRadius: "0 0 6px 6px",
          }}
        >
          {drawers.map(({ anim, wood }, idx) => (
            <div
              key={anim}
              className="relative h-10 rounded"
              style={{
                background: wood,
                animation: `${anim} 12s ease-in-out infinite`,
                transformOrigin: "right center",
                boxShadow:
                  "inset 0 1px 0 oklch(0.65 0.10 52 / 0.3), inset 0 -1px 0 oklch(0.15 0.03 52 / 0.5)",
              }}
            >
              {/* Interior visible when open */}
              <div
                className="absolute right-0 top-0 bottom-0 w-8 flex flex-col justify-center gap-0.5 px-1 opacity-0"
                style={{
                  animation: `${anim}-interior 12s ease-in-out infinite`,
                }}
              >
                {interiorColors[idx].map((c) => (
                  <div
                    key={c}
                    className="h-1.5 rounded-sm"
                    style={{ background: c }}
                  />
                ))}
              </div>
              {/* Slim gold bar handle */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 rounded-full"
                style={{
                  width: "40px",
                  background:
                    "linear-gradient(135deg, oklch(0.88 0.18 52), oklch(0.70 0.22 42), oklch(0.88 0.18 52))",
                  boxShadow: "0 1px 4px oklch(0 0 0 / 0.5)",
                }}
              />
              {/* Edge shadow lines */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "oklch(0.65 0.10 52 / 0.25)" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: "oklch(0.10 0.02 52 / 0.6)" }}
              />
            </div>
          ))}
        </div>
        {/* Base */}
        <div
          className="w-full h-3 rounded-b-md"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.28 0.06 52), oklch(0.20 0.04 52))",
          }}
        />
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <span
          className="text-xs font-bold tracking-wider"
          style={{ color: "oklch(0.82 0.16 52)" }}
        >
          PREMIUM SOFT-CLOSE SYSTEM
        </span>
      </div>
    </div>
  );
}
function DoorAnimation() {
  return (
    <div
      className="relative rounded-xl overflow-hidden h-56 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.90 0.02 80), oklch(0.85 0.03 70))",
      }}
    >
      {/* Wardrobe frame */}
      <div
        className="relative flex"
        style={{
          width: "140px",
          height: "160px",
          background: "oklch(0.20 0.04 52)",
          borderRadius: "4px 4px 0 0",
          boxShadow: "0 4px 20px oklch(0 0 0 / 0.4)",
        }}
      >
        {/* Interior visible behind doors */}
        <div className="absolute inset-[3px] flex flex-col justify-end pb-2 gap-1.5 px-2">
          {/* Hanging clothes bar */}
          <div
            className="w-full h-1 rounded-full"
            style={{ background: "oklch(0.60 0.10 52)" }}
          />
          {/* Hanging clothes */}
          <div className="flex justify-around">
            {[
              "oklch(0.55 0.15 270)",
              "oklch(0.60 0.12 30)",
              "oklch(0.55 0.10 145)",
              "oklch(0.58 0.14 340)",
            ].map((c) => (
              <div key={c} className="flex flex-col items-center gap-0.5">
                <div
                  className="w-0.5 h-3"
                  style={{ background: "oklch(0.60 0.10 52)" }}
                />
                <div className="w-4 h-5 rounded-sm" style={{ background: c }} />
              </div>
            ))}
          </div>
          {/* Shelves */}
          <div
            className="w-full h-px"
            style={{ background: "oklch(0.35 0.07 52)" }}
          />
          <div className="flex gap-1">
            {["oklch(0.65 0.10 230)", "oklch(0.62 0.08 52)"].map((c) => (
              <div
                key={c}
                className="flex-1 h-3 rounded-sm"
                style={{ background: c }}
              />
            ))}
          </div>
          <div
            className="w-full h-px"
            style={{ background: "oklch(0.35 0.07 52)" }}
          />
          <div className="flex gap-1">
            {["oklch(0.68 0.09 145)", "oklch(0.60 0.11 300)"].map((c) => (
              <div
                key={c}
                className="flex-1 h-3 rounded-sm"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        {/* LEFT DOOR */}
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{
            width: "50%",
            transformOrigin: "left center",
            animation: "wardrobe-left 6s ease-in-out infinite",
            zIndex: 2,
          }}
        >
          <div
            className="w-full h-full rounded-tl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.38 0.08 52), oklch(0.28 0.06 52))",
              boxShadow: "inset -2px 0 4px oklch(0 0 0 / 0.3)",
            }}
          >
            {/* Decorative panel */}
            <div
              className="absolute inset-2 rounded-sm border"
              style={{
                borderColor: "oklch(0.50 0.10 52 / 0.4)",
                background: "oklch(0.32 0.07 52 / 0.5)",
              }}
            />
            {/* Gold pull handle */}
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-10 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.88 0.18 52), oklch(0.70 0.22 42), oklch(0.88 0.18 52))",
                boxShadow: "0 1px 4px oklch(0 0 0 / 0.5)",
              }}
            />
          </div>
        </div>

        {/* RIGHT DOOR */}
        <div
          className="absolute right-0 top-0 bottom-0"
          style={{
            width: "50%",
            transformOrigin: "right center",
            animation: "wardrobe-right 6s ease-in-out infinite",
            zIndex: 2,
          }}
        >
          <div
            className="w-full h-full rounded-tr"
            style={{
              background:
                "linear-gradient(225deg, oklch(0.38 0.08 52), oklch(0.28 0.06 52))",
              boxShadow: "inset 2px 0 4px oklch(0 0 0 / 0.3)",
            }}
          >
            {/* Decorative panel */}
            <div
              className="absolute inset-2 rounded-sm border"
              style={{
                borderColor: "oklch(0.50 0.10 52 / 0.4)",
                background: "oklch(0.32 0.07 52 / 0.5)",
              }}
            />
            {/* Gold pull handle */}
            <div
              className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-10 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.88 0.18 52), oklch(0.70 0.22 42), oklch(0.88 0.18 52))",
                boxShadow: "0 1px 4px oklch(0 0 0 / 0.5)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-0 right-0 text-center">
        <span
          className="text-xs font-bold tracking-wider"
          style={{ color: "oklch(0.35 0.08 52)" }}
        >
          DOUBLE SWING WARDROBE
        </span>
      </div>
    </div>
  );
}
function SofaAnimation() {
  return (
    <div
      className="relative rounded-xl overflow-hidden h-56 flex flex-col items-center justify-end pb-6"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.18 0.04 255), oklch(0.13 0.03 255))",
      }}
    >
      {/* Sofa assembly */}
      <div className="relative w-44">
        {/* Backrest */}
        <div
          className="w-36 mx-auto h-10 rounded-t-xl rounded-b-sm mb-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.58 0.14 52), oklch(0.48 0.12 52))",
          }}
        />
        {/* Seat with armrests */}
        <div className="flex items-end gap-0">
          {/* Left armrest */}
          <div
            className="w-6 h-14 rounded-l-lg rounded-br-sm flex-shrink-0"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.55 0.13 52), oklch(0.42 0.10 52))",
            }}
          />
          {/* Seat */}
          <div
            className="flex-1 h-10 relative"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.52 0.12 52), oklch(0.40 0.10 52))",
            }}
          >
            {/* Animated floating cushion */}
            <div
              className="absolute -top-5 left-1/2 -translate-x-1/2 w-16 h-6 rounded-lg shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.16 52), oklch(0.60 0.18 45))",
                animation: "sofa-cushion-float 2.5s ease-in-out infinite",
              }}
            />
            {/* Seat lines */}
            <div
              className="absolute bottom-2 left-1/4 right-1/4 h-0.5 rounded-full opacity-40"
              style={{ background: "oklch(0.30 0.06 52)" }}
            />
          </div>
          {/* Right armrest */}
          <div
            className="w-6 h-14 rounded-r-lg rounded-bl-sm flex-shrink-0"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.55 0.13 52), oklch(0.42 0.10 52))",
            }}
          />
        </div>
        {/* Legs */}
        <div className="flex justify-between px-4 mt-0.5">
          <div
            className="w-2 h-3 rounded-b-sm"
            style={{ background: "oklch(0.35 0.08 52)" }}
          />
          <div
            className="w-2 h-3 rounded-b-sm"
            style={{ background: "oklch(0.35 0.08 52)" }}
          />
        </div>
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <span
          className="text-xs font-bold tracking-wider"
          style={{ color: "oklch(0.78 0.17 52)" }}
        >
          PREMIUM SOFA DESIGN
        </span>
      </div>
    </div>
  );
}

function WardrobeAnimation() {
  return (
    <div
      className="relative rounded-xl overflow-hidden h-56 flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.20 0.04 255), oklch(0.15 0.03 255))",
      }}
    >
      {/* Wardrobe carcass */}
      <div
        className="relative w-40 h-40 rounded-sm border-2 flex overflow-hidden"
        style={{
          borderColor: "oklch(0.35 0.08 52)",
          background: "oklch(0.10 0.02 255)",
        }}
      >
        {/* Inside clothes hint */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-0.5 h-16 rounded-full opacity-40"
              style={{ background: "oklch(0.72 0.18 52)" }}
            />
          ))}
        </div>
        {/* Left door */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/2 rounded-l-sm"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.42 0.09 52), oklch(0.32 0.07 52))",
            animation: "wardrobe-left 5s ease-in-out infinite",
            transformOrigin: "left center",
          }}
        >
          {/* Left door panel */}
          <div
            className="absolute inset-2 border rounded-sm opacity-40"
            style={{ borderColor: "oklch(0.65 0.15 52)" }}
          />
          {/* Left handle */}
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.82 0.18 52), oklch(0.65 0.22 42))",
            }}
          />
        </div>
        {/* Right door */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 rounded-r-sm"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.40 0.09 52), oklch(0.30 0.07 52))",
            animation: "wardrobe-right 5s ease-in-out infinite",
            transformOrigin: "right center",
          }}
        >
          {/* Right door panel */}
          <div
            className="absolute inset-2 border rounded-sm opacity-40"
            style={{ borderColor: "oklch(0.65 0.15 52)" }}
          />
          {/* Right handle */}
          <div
            className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.82 0.18 52), oklch(0.65 0.22 42))",
            }}
          />
        </div>
      </div>
      {/* Legs */}
      <div className="flex gap-28 mt-0.5">
        <div
          className="w-2 h-3 rounded-b-sm"
          style={{ background: "oklch(0.35 0.08 52)" }}
        />
        <div
          className="w-2 h-3 rounded-b-sm"
          style={{ background: "oklch(0.35 0.08 52)" }}
        />
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <span
          className="text-xs font-bold tracking-wider"
          style={{ color: "oklch(0.78 0.17 52)" }}
        >
          PREMIUM WARDROBE
        </span>
      </div>
    </div>
  );
}

function StarRating({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none"
          data-ocid={`feedback.star.${star}`}
        >
          <Star
            className={`h-7 w-7 transition-colors ${
              star <= (hovered || value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  async function handleFeedbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !feedbackName.trim() ||
      feedbackRating === 0 ||
      !feedbackComment.trim()
    ) {
      toast.error("Please fill all fields and select a rating.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success(
      "Thank you for your feedback! We appreciate your kind words.",
    );
    setFeedbackName("");
    setFeedbackRating(0);
    setFeedbackComment("");
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, oklch(0.13 0.04 250 / 0.75), oklch(0.13 0.04 250 / 0.88)), url('/assets/generated/hero-interior.dim_1920x900.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <FloatingParticles />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="inline-block text-xs font-bold tracking-[0.4em] uppercase mb-6 border border-yellow-400/50 px-4 py-2 rounded-full"
              style={{ color: "oklch(0.82 0.16 52)" }}
            >
              Premium Interior Design Services
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              TRANSFORM YOUR SPACES INTO{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.72 0.18 52), oklch(0.90 0.15 52), oklch(0.72 0.18 52))",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer-sweep 3s linear infinite",
                  display: "inline-block",
                }}
              >
                MASTERPIECES
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Expert interior design for every room. From concept to completion,
              we create spaces that reflect your unique style and vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order/$category" params={{ category: "livingRoom" }}>
                <Button
                  size="lg"
                  className="text-white px-8 py-6 text-base font-semibold tracking-wide border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.18 52), oklch(0.60 0.22 42))",
                  }}
                  data-ocid="hero.primary_button"
                >
                  START YOUR DESIGN ORDER
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:9702930363">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white bg-white/10 hover:bg-white/20 px-8 py-6 text-base font-semibold"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Projects Completed", value: 500, suffix: "+" },
              { label: "Happy Clients", value: 450, suffix: "+" },
              { label: "Years Experience", value: 10, suffix: "+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-xl md:text-2xl font-display font-bold"
                  style={GOLD_GRADIENT_STATS}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-white/60 mt-0.5">{stat.label}</p>
              </div>
            ))}
            {/* Warranty Badge */}
            <div
              className="text-center flex flex-col items-center justify-center"
              data-ocid="hero.warranty_badge"
            >
              <div
                className="text-2xl md:text-3xl font-display font-bold leading-none"
                style={GOLD_GRADIENT_STATS}
              >
                🛡️ 10
              </div>
              <p className="text-xs text-white/60 mt-0.5 font-bold tracking-wider">
                YR WARRANTY
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={LABEL_GOLD_STYLE}
            >
              Our Services
            </span>
            <h2
              className="font-display text-3xl md:text-4xl font-bold mt-2"
              style={NAVY_HEADING}
            >
              ORDER BY CATEGORY
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Select a design category and place your order for a fully
              customized interior transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 5) * 0.1 }}
                whileHover={{ rotateY: 5, rotateX: -3, scale: 1.03 }}
                style={{ transformStyle: "preserve-3d" }}
                data-ocid={`services.item.${i + 1}`}
              >
                <Card className="group overflow-hidden hover:shadow-card-hover transition-all duration-300 border-border h-full">
                  {(cat as any).image ? (
                    <div className="h-36 overflow-hidden">
                      <img
                        src={(cat as any).image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-36 flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.15 0.05 255), oklch(0.20 0.06 255))",
                      }}
                    >
                      {(cat as any).icon &&
                        (() => {
                          const Icon = (cat as any).icon;
                          return (
                            <motion.div
                              animate={{ scale: [1, 1.12, 1] }}
                              transition={{
                                duration: 2.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: i * 0.15,
                              }}
                            >
                              <Icon
                                className="w-14 h-14"
                                style={{ color: "oklch(0.82 0.16 52)" }}
                              />
                            </motion.div>
                          );
                        })()}
                    </div>
                  )}
                  <CardContent className="p-4 flex flex-col gap-2">
                    <h3 className="font-display font-bold text-foreground text-sm md:text-base">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                      {cat.description}
                    </p>
                    <Link to="/order/$category" params={{ category: cat.id }}>
                      <Button
                        size="sm"
                        className="w-full text-white text-xs font-semibold tracking-wide border-0"
                        style={STEP_GOLD_BG}
                        data-ocid={`services.primary_button.${i + 1}`}
                      >
                        Order Now <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={LABEL_GOLD_STYLE}
            >
              Why Us
            </span>
            <h2
              className="font-display text-3xl md:text-4xl font-bold mt-2"
              style={NAVY_HEADING}
            >
              WHY CHOOSE US
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "10+ Years Experience",
                desc: "Over a decade of delivering premium interior design solutions to hundreds of satisfied clients.",
                icon: Star,
              },
              {
                title: "Customized Designs",
                desc: "Every project is uniquely tailored to your taste, budget, and lifestyle requirements.",
                icon: CheckCircle,
              },
              {
                title: "End-to-End Service",
                desc: "From initial consultation to final installation, we handle every detail with precision.",
                icon: ArrowRight,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="bg-white rounded-xl p-8 shadow-card text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 24px 48px rgba(0,0,0,0.10)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.18 52 / 0.15), oklch(0.60 0.22 42 / 0.15))",
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: "oklch(0.62 0.22 42)" }}
                    />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-xl mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Designer Section */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={LABEL_GOLD_STYLE}
            >
              Leadership
            </span>
            <h2
              className="font-display text-3xl md:text-4xl font-bold mt-2"
              style={NAVY_HEADING}
            >
              MEET OUR LEAD DESIGNER
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-2xl translate-x-4 translate-y-4" />
              <img
                src="/assets/generated/designer-vinay.dim_400x500.jpg"
                alt="Virendra Vishwakarma"
                className="relative rounded-2xl w-full object-cover shadow-card"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span
                className="text-xs font-bold tracking-[0.3em] uppercase"
                style={LABEL_GOLD_STYLE}
              >
                Lead Designer & Owner
              </span>
              <h3
                className="font-display text-3xl md:text-4xl font-bold mt-2 mb-2"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.18 0.06 255), oklch(0.38 0.17 255))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Virendra Vishwakarma
              </h3>
              <div className="w-12 h-1 bg-primary mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                With over 10 years of expertise in luxury interior design,
                Virendra Vishwakarma has transformed hundreds of homes and
                commercial spaces across the region.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                His design philosophy blends timeless elegance with modern
                functionality — creating spaces that are both visually stunning
                and supremely livable. Every project is a personal mission to
                exceed client expectations.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "Living Room & Bedroom Specialist",
                  "Commercial & Office Design",
                  "Budget-Friendly to Luxury Projects",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: "oklch(0.62 0.22 42)" }}
                    />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:9702930363">
                  <Button
                    className="text-white border-0"
                    style={STEP_GOLD_BG}
                    data-ocid="about.primary_button"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Now: 9702930363
                  </Button>
                </a>
                <Link to="/order/$category" params={{ category: "livingRoom" }}>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    Place an Order
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Philosophy / Inspiring Quotes */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "oklch(0.11 0.03 255)" }}
      >
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-5"
          style={{ background: "oklch(0.55 0.18 255)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: "oklch(0.55 0.18 255)", filter: "blur(100px)" }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="text-xs font-bold tracking-[0.4em] uppercase mb-3 block"
              style={{ color: "oklch(0.78 0.17 52)" }}
            >
              Words of Wisdom
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
              DESIGN PHILOSOPHY
            </h2>
            <div
              className="w-16 h-1 mx-auto mt-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 52), oklch(0.60 0.22 42))",
              }}
            />
          </motion.div>

          <div className="relative h-64 sm:h-52">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <Quote
                  className="h-10 w-10 mb-4 opacity-40"
                  style={{ color: "oklch(0.78 0.17 52)" }}
                />
                <p className="text-white text-xl sm:text-2xl md:text-3xl font-display font-medium leading-relaxed italic mb-6">
                  &ldquo;{QUOTES[quoteIndex].text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-px"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.18 52), oklch(0.60 0.22 42))",
                    }}
                  />
                  <div className="text-center">
                    <p
                      className="text-sm font-bold tracking-wider"
                      style={{ color: "oklch(0.78 0.17 52)" }}
                    >
                      {QUOTES[quoteIndex].author}
                    </p>
                    <p className="text-xs text-white/50">
                      {QUOTES[quoteIndex].role}
                    </p>
                  </div>
                  <div
                    className="w-8 h-px"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.18 52), oklch(0.60 0.22 42))",
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-2 justify-center mt-8">
            {QUOTES.map((quote, i) => (
              <button
                key={quote.author}
                type="button"
                onClick={() => setQuoteIndex(i)}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  background:
                    i === quoteIndex
                      ? "oklch(0.72 0.18 52)"
                      : "oklch(0.4 0.02 255)",
                  transform: i === quoteIndex ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mechanism Gallery */}
      <section className="py-20 bg-white" id="craftsmanship">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={LABEL_GOLD_STYLE}
            >
              Inside the Details
            </span>
            <h2
              className="font-display text-3xl md:text-4xl font-bold mt-2"
              style={NAVY_HEADING}
            >
              PRECISION CRAFTSMANSHIP
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              See the Quality in Every Detail — the hardware and mechanisms we
              use are engineered for years of perfect performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Animated Drawer */}
            <motion.div
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              data-ocid="craftsmanship.item.1"
            >
              <DrawerAnimation />
            </motion.div>

            {/* Animated Door */}
            <motion.div
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              data-ocid="craftsmanship.item.2"
            >
              <DoorAnimation />
            </motion.div>

            {/* Animated Sofa */}
            <motion.div
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              data-ocid="craftsmanship.item.3"
            >
              <SofaAnimation />
            </motion.div>

            {/* Animated Wardrobe */}
            <motion.div
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              data-ocid="craftsmanship.item.4"
            >
              <WardrobeAnimation />
            </motion.div>

            {/* Static image cards */}
            {MECHANISM_IMAGES.map((item, i) => (
              <motion.div
                key={item.label}
                className="group relative rounded-xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 2) * 0.1 }}
                data-ocid={`craftsmanship.item.${i + 5}`}
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold font-display text-sm mb-1">
                    {item.label}
                  </h3>
                  <p className="text-white/70 text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Year Warranty */}
      <section
        className="py-20"
        style={{ background: "oklch(0.12 0.05 255)" }}
        data-ocid="warranty.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Shield Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 52 / 0.15), oklch(0.60 0.22 42 / 0.15))",
                border: "2px solid oklch(0.72 0.18 52 / 0.4)",
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            >
              <span className="text-5xl select-none">🛡️</span>
            </motion.div>

            <p
              className="text-xs font-bold tracking-[0.3em] uppercase mb-2"
              style={LABEL_GOLD_STYLE}
            >
              Our Promise
            </p>
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.82 0.16 52), oklch(0.70 0.20 42))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              10 Year Warranty
            </h2>
            <div
              className="w-16 h-1 mx-auto mb-6"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.72 0.18 52), oklch(0.60 0.22 42))",
              }}
            />
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              We stand behind every installation with a full{" "}
              <span className="text-amber-400 font-semibold">
                10-year warranty
              </span>{" "}
              on all mechanisms, hardware, and workmanship.
            </p>
          </motion.div>

          {/* Warranty Benefit Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "⚙️",
                title: "Mechanisms & Hardware",
                coverage: "10 Year Coverage",
                desc: "Every drawer slider, hinge, and fitting is covered for a full decade.",
              },
              {
                icon: "🔨",
                title: "Workmanship",
                coverage: "10 Year Guarantee",
                desc: "Our craftsmanship is guaranteed — any defect, we fix it, free of charge.",
              },
              {
                icon: "✅",
                title: "Free Repairs",
                coverage: "No Hidden Charges",
                desc: "If anything goes wrong within 10 years, we repair it at zero cost to you.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: "oklch(0.18 0.04 255)",
                  border: "1.5px solid oklch(0.72 0.18 52 / 0.4)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ scale: 1.03, borderColor: "oklch(0.82 0.16 52)" }}
                data-ocid={`warranty.item.${i + 1}`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="font-display font-bold text-lg mb-1"
                  style={{ color: "oklch(0.82 0.16 52)" }}
                >
                  {item.title}
                </h3>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3"
                  style={{
                    background: "oklch(0.72 0.18 52 / 0.15)",
                    color: "oklch(0.82 0.16 52)",
                    border: "1px solid oklch(0.72 0.18 52 / 0.4)",
                  }}
                >
                  {item.coverage}
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.p
            className="text-center text-white/40 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            * Warranty registered in the name of{" "}
            <span className="text-amber-400/70">Virendra Vishwakarma</span> |
            Contact: <span className="text-amber-400/70">9702930363</span>
          </motion.p>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20" style={{ background: "oklch(0.96 0.01 255)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={LABEL_GOLD_STYLE}
            >
              Our Process
            </span>
            <h2
              className="font-display text-3xl md:text-4xl font-bold mt-2"
              style={NAVY_HEADING}
            >
              HOW WE WORK
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
            <p className="text-muted-foreground mt-4">
              Simple. Professional. Outstanding.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 origin-left"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.72 0.18 52 / 0.3), oklch(0.60 0.22 42 / 0.3))",
                transformOrigin: "left center",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {WORK_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    className="relative text-center"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    data-ocid={`process.item.${i + 1}`}
                  >
                    <div className="relative inline-flex">
                      <motion.div
                        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-lg mb-5"
                        style={STEP_GOLD_BG}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <span
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center text-xs font-black"
                        style={{
                          borderColor: "oklch(0.72 0.18 52)",
                          color: "oklch(0.62 0.22 42)",
                        }}
                      >
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials + Feedback Form */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={LABEL_GOLD_STYLE}
            >
              Client Reviews
            </span>
            <h2
              className="font-display text-3xl md:text-4xl font-bold mt-2"
              style={NAVY_HEADING}
            >
              WHAT OUR CLIENTS SAY
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                }}
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <Card className="h-full border-border hover:shadow-card-hover transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex gap-0.5 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= t.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 italic">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.72 0.18 52 / 0.15), oklch(0.60 0.22 42 / 0.15))",
                          color: "oklch(0.62 0.22 42)",
                        }}
                      >
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Feedback Form */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="rounded-2xl p-8 shadow-card"
              style={{ background: "oklch(0.97 0.01 255)" }}
            >
              <h3
                className="font-display text-2xl font-bold mb-2 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 52), oklch(0.60 0.22 42))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Share Your Experience
              </h3>
              <p className="text-muted-foreground text-sm text-center mb-6">
                We value every word from our clients. Tell us about your
                experience!
              </p>
              <form
                onSubmit={handleFeedbackSubmit}
                className="flex flex-col gap-5"
              >
                <div>
                  <label
                    htmlFor="feedback-name"
                    className="text-sm font-semibold text-foreground mb-1.5 block"
                  >
                    Your Name
                  </label>
                  <Input
                    id="feedback-name"
                    placeholder="Enter your name"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    data-ocid="feedback.input"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2 block">
                    Rating
                  </p>
                  <StarRating
                    value={feedbackRating}
                    onChange={setFeedbackRating}
                  />
                </div>
                <div>
                  <label
                    htmlFor="feedback-comment"
                    className="text-sm font-semibold text-foreground mb-1.5 block"
                  >
                    Your Comment
                  </label>
                  <Textarea
                    id="feedback-comment"
                    placeholder="Tell us about your experience with our design services..."
                    rows={4}
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    data-ocid="feedback.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white font-semibold py-5 border-0"
                  style={STEP_GOLD_BG}
                  data-ocid="feedback.submit_button"
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/919702930363"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full text-white font-semibold text-sm shadow-xl"
        style={{
          background: "#25D366",
          animation: "whatsapp-pulse 2.5s infinite",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-ocid="whatsapp.primary_button"
      >
        <MessageCircle className="h-5 w-5 fill-white" />
        Chat on WhatsApp
      </motion.a>

      <style>{`
        @keyframes whatsapp-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          50% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
        }
      `}</style>
    </div>
  );
}
