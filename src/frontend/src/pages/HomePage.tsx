import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle, Phone, Star } from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
];

export default function HomePage() {
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
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-bold tracking-[0.4em] text-primary uppercase mb-6 border border-primary/50 px-4 py-2 rounded-full">
              Premium Interior Design Services
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              TRANSFORM YOUR SPACES INTO{" "}
              <span className="text-primary">MASTERPIECES</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Expert interior design for every room. From concept to completion,
              we create spaces that reflect your unique style and vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order/$category" params={{ category: "livingRoom" }}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold tracking-wide"
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
          <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-3 gap-4">
            {[
              { label: "Projects Completed", value: "500+" },
              { label: "Happy Clients", value: "450+" },
              { label: "Years Experience", value: "10+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl md:text-2xl font-display font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-white/60 mt-0.5">{stat.label}</p>
              </div>
            ))}
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
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
              Our Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              ORDER BY CATEGORY
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Select a design category and place your order for a fully
              customized interior transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`services.item.${i + 1}`}
              >
                <Card className="group overflow-hidden hover:shadow-card-hover transition-all duration-300 border-border h-full">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5 flex flex-col gap-3">
                    <h3 className="font-display font-bold text-foreground text-lg">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                      {cat.description}
                    </p>
                    <Link to="/order/$category" params={{ category: cat.id }}>
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-semibold tracking-wide"
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
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
              Why Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
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
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon className="h-6 w-6 text-primary" />
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
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
              Leadership
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
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
                alt="Vinay Vishwakarma"
                className="relative rounded-2xl w-full object-cover shadow-card"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
                Lead Designer & Owner
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-2">
                Vinay Vishwakarma
              </h3>
              <div className="w-12 h-1 bg-primary mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                With over 10 years of expertise in luxury interior design, Vinay
                Vishwakarma has transformed hundreds of homes and commercial
                spaces across the region.
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
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:9702930363">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white"
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

      <Footer />
    </div>
  );
}
