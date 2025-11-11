import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter, ChefHat, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home") },
  { title: "Speisekarte", url: createPageUrl("Speisekarte") },
  { title: "Über Uns", url: createPageUrl("UeberUns") },
  { title: "Galerie", url: createPageUrl("Galerie") },
  { title: "Reservierung", url: createPageUrl("Reservierung") },
  { title: "Kontakt", url: createPageUrl("Kontakt") },
];

interface LayoutProps {
  children: React.ReactNode;
  currentPageName?: string; // eslint-disable-line @typescript-eslint/no-unused-vars
}

export default function Layout({ children, currentPageName: _ }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add background when scrolled
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }

      // Show scroll to top button
      setShowScrollTop(currentScrollY > 500);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: headerVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-dark shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-gold-light))] flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all">
                <ChefHat className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white font-serif tracking-tight">
                  Cinar Grill
                </span>
                <p className="text-xs text-white/70 font-sans">Authentic Turkish Cuisine</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.url}
                    to={item.url}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all relative group",
                      isActive
                        ? "text-[hsl(var(--accent-gold))]"
                        : "text-white hover:text-[hsl(var(--accent-gold))]"
                    )}
                  >
                    {item.title}
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[hsl(var(--accent-gold))] rounded-full transition-all",
                        isActive ? "w-8" : "w-0 group-hover:w-8"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to={createPageUrl("Reservierung")}>
                <Button
                  variant="premium"
                  size="lg"
                  className="rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Reservieren
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-br from-gray-900 to-gray-800 z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <span className="text-2xl font-bold text-white font-serif">
                    Menü
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6 space-y-2">
                  {navigationItems.map((item, index) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <motion.div
                        key={item.url}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.url}
                          className={cn(
                            "flex items-center px-6 py-4 rounded-xl text-lg font-medium transition-all",
                            isActive
                              ? "bg-[hsl(var(--accent-gold))]/20 text-[hsl(var(--accent-gold))] shadow-lg"
                              : "text-white hover:bg-white/5"
                          )}
                        >
                          {item.title}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Contact Info */}
                <div className="p-6 border-t border-white/10 space-y-4">
                  <Link to={createPageUrl("Reservierung")}>
                    <Button
                      variant="premium"
                      size="lg"
                      className="w-full rounded-xl shadow-lg"
                    >
                      Tisch Reservieren
                    </Button>
                  </Link>

                  <div className="space-y-3 text-sm text-white/70">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4" />
                      <a href="tel:+491234567890" className="hover:text-white transition-colors">
                        +49 123 456 7890
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4" />
                      <a href="mailto:info@cinargrill.de" className="hover:text-white transition-colors">
                        info@cinargrill.de
                      </a>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 pt-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[hsl(var(--accent-gold))] hover:text-gray-900 transition-all"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[hsl(var(--accent-gold))] hover:text-gray-900 transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[hsl(var(--accent-gold))] hover:text-gray-900 transition-all"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container-custom section-padding-sm">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-gold-light))] flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-gray-900" />
                </div>
                <span className="text-xl font-bold font-serif">Cinar Grill</span>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Authentische türkische Küche seit über 30 Jahren. Tradition und Qualität in jedem Gericht.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(var(--accent-gold))] hover:text-gray-900 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(var(--accent-gold))] hover:text-gray-900 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(var(--accent-gold))] hover:text-gray-900 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 font-serif">Quick Links</h3>
              <ul className="space-y-3">
                {navigationItems.slice(0, 4).map((item) => (
                  <li key={item.url}>
                    <Link
                      to={item.url}
                      className="text-white/70 hover:text-[hsl(var(--accent-gold))] transition-colors link-underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-6 font-serif">Kontakt</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white/70">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Musterstraße 123<br />12345 Musterstadt</span>
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <a href="tel:+491234567890" className="hover:text-white transition-colors">
                    +49 123 456 7890
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <a href="mailto:info@cinargrill.de" className="hover:text-white transition-colors">
                    info@cinargrill.de
                  </a>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-lg font-bold mb-6 font-serif">Öffnungszeiten</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Mo - Fr</p>
                    <p className="text-sm">11:00 - 23:00</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Sa - So</p>
                    <p className="text-sm">12:00 - 00:00</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
              <p>&copy; {new Date().getFullYear()} Cinar Grill. Alle Rechte vorbehalten.</p>
              <div className="flex gap-6">
                <Link to="/datenschutz" className="hover:text-white transition-colors">
                  Datenschutz
                </Link>
                <Link to="/impressum" className="hover:text-white transition-colors">
                  Impressum
                </Link>
                <Link to="/agb" className="hover:text-white transition-colors">
                  AGB
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-gold-light))] text-gray-900 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all z-40"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
