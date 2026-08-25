import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { getSite } from "@/lib/data";

export default function Footer() {
  const site = getSite();

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <img src="/event-logo.png" alt="CaseVerse 2026" className="h-12 w-auto" />
            </Link>
            <p className="mt-1 text-sm text-muted font-heading">{site.tagline}</p>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Organized by Rotaract Club of Jatiya Kabi Kazi Nazrul Islam University.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Competition", path: "/competition" },
                { label: "Timeline", path: "/timeline" },
                { label: "News", path: "/news" },
                { label: "Sponsors", path: "/sponsors" },
                { label: "Results", path: "/results" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-muted hover:text-text transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "FAQ", path: "/faq" },
                { label: "Prizes", path: "/prizes" },
                { label: "Judges", path: "/judges" },
                { label: "Register", path: "/register" },
                { label: "Dashboard", path: "/dashboard" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-muted hover:text-text transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-muted mt-0.5 shrink-0" />
                <span className="text-sm text-muted leading-relaxed">
                  {site.venue.name}, {site.venue.address}, {site.venue.country}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="flex items-center gap-2.5 text-sm text-muted hover:text-text transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted hover:text-text transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} CaseVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/faq"
              className="text-xs text-muted hover:text-text transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/faq"
              className="text-xs text-muted hover:text-text transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              to="/admin"
              className="text-xs text-muted hover:text-text transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
