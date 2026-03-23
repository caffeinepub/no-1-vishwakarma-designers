import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-navy text-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="block text-xl font-display font-bold text-white tracking-wide">
                VISHWAKARMA DESIGN STUDIO
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Transforming spaces into masterpieces. Premium interior design
              services across all categories.
            </p>
            <div className="flex gap-4 mt-6">
              <span className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors cursor-pointer">
                <Facebook className="h-4 w-4" />
              </span>
              <span className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors cursor-pointer">
                <Instagram className="h-4 w-4" />
              </span>
              <span className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors cursor-pointer">
                <Twitter className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-white/50 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Living Room Design", href: "/order/livingRoom" },
                { label: "Bedroom Design", href: "/order/bedroom" },
                { label: "Kitchen Design", href: "/order/kitchen" },
                { label: "Bathroom Design", href: "/order/bathroom" },
                { label: "Office Design", href: "/order/office" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href as "/"}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase text-white/50 mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/50 mb-0.5">Phone</p>
                  <a
                    href="tel:9702930363"
                    className="text-sm text-white hover:text-primary transition-colors block"
                  >
                    9702930363
                  </a>
                  <a
                    href="tel:9930051681"
                    className="text-sm text-white hover:text-primary transition-colors block mt-1"
                  >
                    9930051681
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle
                  className="h-4 w-4 mt-0.5 flex-shrink-0"
                  style={{ color: "#25D366" }}
                />
                <div>
                  <p className="text-xs text-white/50 mb-0.5">WhatsApp</p>
                  <a
                    href="https://wa.me/919702930363"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-green-400 transition-colors"
                    data-ocid="footer.link"
                  >
                    WhatsApp: 9702930363
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/50 mb-0.5">Email</p>
                  <a
                    href="mailto:info@vishwakarmadesignstudio.com"
                    className="text-sm text-white hover:text-primary transition-colors"
                  >
                    info@vishwakarmadesignstudio.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/50 mb-0.5">Owner</p>
                  <p className="text-sm text-white">Virendra Vishwakarma</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {year} Vishwakarma Design Studio. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
