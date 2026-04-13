"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Nos centres", href: "/nos-centres" },
  { name: "Poids lourd", href: "/poids-lourd" },
  { name: "Particulier", href: "/particulier" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Maquette", href: "/maquette" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_30px_rgba(109,40,217,0.08)] border-b border-purple-bright/10"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-bright to-purple-light rounded-xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                <span
                  className={cn(
                    "relative text-2xl font-black tracking-tighter transition-colors duration-300",
                    scrolled ? "text-purple-deep" : "text-white"
                  )}
                >
                  RECA
                  <span className="text-purple-bright">COR</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center">
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500",
                  scrolled ? "bg-muted" : "bg-white/10 backdrop-blur-md"
                )}
              >
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onMouseEnter={() => setHovered(item.name)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    {/* Hover pill */}
                    <AnimatePresence>
                      {hovered === item.name && (
                        <motion.span
                          layoutId="nav-pill"
                          className={cn(
                            "absolute inset-0 rounded-full",
                            scrolled ? "bg-white shadow-sm" : "bg-white/20"
                          )}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                    </AnimatePresence>
                    <span
                      className={cn(
                        "relative z-10 transition-colors duration-200",
                        scrolled
                          ? hovered === item.name
                            ? "text-purple-deep"
                            : "text-foreground/70"
                          : hovered === item.name
                            ? "text-white"
                            : "text-white/70"
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* CTA button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="ml-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-bright text-white text-sm font-semibold overflow-hidden transition-shadow hover:shadow-[0_4px_24px_rgba(109,40,217,0.4)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-light to-purple-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Nous contacter</span>
                  <ArrowRight className="relative h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </nav>

            {/* Mobile toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen(!open)}
              className={cn(
                "lg:hidden relative z-50 p-2 rounded-xl transition-colors",
                open
                  ? "text-white"
                  : scrolled
                    ? "text-foreground"
                    : "text-white"
              )}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-purple-deep"
          >
            {/* Animated background blobs */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  x: [0, 30, -20, 0],
                  y: [0, -30, 20, 0],
                  scale: [1, 1.2, 0.9, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-80 h-80 bg-purple-bright/30 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  x: [0, -30, 20, 0],
                  y: [0, 20, -30, 0],
                  scale: [1, 0.9, 1.2, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-light/20 rounded-full blur-3xl"
              />
            </div>

            <nav className="relative h-full flex flex-col items-center justify-center gap-2">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block text-4xl sm:text-5xl font-bold text-white/70 hover:text-white transition-colors duration-200 py-3"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: navigation.length * 0.08,
                  duration: 0.4,
                }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-purple-deep font-bold text-lg"
                >
                  Nous contacter
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
