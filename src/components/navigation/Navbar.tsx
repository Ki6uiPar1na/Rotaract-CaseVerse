import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { getSite } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [site, setSite] = useState<Record<string, unknown> | null>(null);
  const { isScrolled } = useScrollPosition();
  const { isOpen, toggle, close } = useMobileMenu();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => { getSite().then(setSite); }, []);

  useEffect(() => {
    close();
    setOpenDropdown(null);
  }, [location.pathname, close]);

  const isActive = (path: string) => location.pathname === path;
  const navItems = (site?.navigation || []) as { label: string; path: string; children?: { label: string; path: string }[] }[];
  const registrationOpen = site?.registrationOpen !== false;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-22">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/event-logo.png" alt="CaseVerse 2026" className="h-7 sm:h-9 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.path} className="relative">
                {item.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive(item.path) || item.children.some((c) => isActive(c.path))
                          ? "text-primary"
                          : "text-muted hover:text-text"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-48 bg-surface border border-border rounded-lg shadow-lg py-1"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={cn(
                                "block px-4 py-2.5 text-sm transition-colors",
                                isActive(child.path)
                                  ? "text-primary bg-surface-light"
                                  : "text-muted hover:text-text hover:bg-surface-light"
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive(item.path) ? "text-primary" : "text-muted hover:text-text"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to={registrationOpen ? "/register" : "/dashboard"}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors"
            >
              {registrationOpen ? "REGISTER NOW" : "CHECK RESULTS"}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggle}
            className="lg:hidden p-2 text-muted hover:text-text transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-surface border-t border-border">
          <div className="px-4 py-6 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.path}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-3 text-base font-medium rounded-md transition-colors",
                        item.children.some((c) => isActive(c.path))
                          ? "text-primary"
                          : "text-muted hover:text-text"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          openDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={close}
                            className={cn(
                              "block px-3 py-2.5 text-sm rounded-md transition-colors",
                              isActive(child.path)
                                ? "text-primary"
                                : "text-muted hover:text-text"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={close}
                    className={cn(
                      "block px-3 py-3 text-base font-medium rounded-md transition-colors",
                      isActive(item.path) ? "text-primary" : "text-muted hover:text-text"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                to={registrationOpen ? "/register" : "/dashboard"}
                onClick={close}
                className="block w-full text-center px-5 py-3 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors"
              >
                {registrationOpen ? "REGISTER NOW" : "CHECK RESULTS"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
