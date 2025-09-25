"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";
import Image from "next/image";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const { isSignedIn, isLoaded } = useUser();
  const [activeHash, setActiveHash] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [colorPalette, setColorPalette] = useState({
    brand: "#111111",
    brandText: "#FFFFFF",
    brandHover: "#000000",
    brandLight: "#f8f9fa",
    brandMuted: "#6b7280",
  });

  const path = usePathname();

  // Extract colors from logo
  const extractColorPalette = useCallback(async () => {
    try {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = "/logos/logo1.png";

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 64;
      canvas.height = 64;
      ctx.drawImage(img, 0, 0, 64, 64);

      const imageData = ctx.getImageData(0, 0, 64, 64);
      const data = imageData.data;

      const colorMap = new Map();
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a > 128) {
          const key = `${Math.floor(r / 8) * 8},${Math.floor(g / 8) * 8},${Math.floor(b / 8) * 8}`;
          colorMap.set(key, (colorMap.get(key) || 0) + 1);
        }
      }

      let dominantColor = null;
      let maxCount = 0;
      for (const [color, count] of colorMap.entries()) {
        if (count > maxCount) {
          maxCount = count;
          dominantColor = color;
        }
      }

      if (dominantColor) {
        const [r, g, b] = dominantColor.split(",").map(Number);
        const brandHex = rgbToHex(r, g, b);

        setColorPalette({
          brand: brandHex,
          brandText: getContrastText(brandHex),
          brandHover: shadeColor(brandHex, -15),
          brandLight: shadeColor(brandHex, 85),
          brandMuted: shadeColor(brandHex, 40),
        });
      }
    } catch (error) {
      console.warn("Color extraction failed:", error);
    }
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hash detection
  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash);
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    extractColorPalette();
  }, [extractColorPalette]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest("nav")) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = useMemo(
    () => [
      { href: "/#features", label: "Features" },
      { href: "/#how-it-work", label: "How it works" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/about", label: "About Us" },
    ],
    []
  );

  const handleNavClick = useCallback((href) => {
    // Extract hash from href (e.g., "/#features" -> "#features")
    const hash = href.includes("#") ? href.substring(href.indexOf("#")) : href;
    setActiveHash(hash);
    setIsMobileMenuOpen(false);
  }, []);

  const navLinkClasses = useMemo(
    () =>
      "relative group font-medium inline-block transform transition-all duration-300 text-gray-700 dark:text-slate-400 hover:text-[var(--brand)] dark:hover:text-[var(--brand-dark)] hover:scale-105 py-2 px-1 ",
    []
  );

  const getUnderlineClasses = useCallback(
    (href) => {
      // Extract hash from href for comparison with activeHash
      const hash = href.includes("#")
        ? href.substring(href.indexOf("#"))
        : href;
      return `absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${
        activeHash === hash
          ? "w-full opacity-100"
          : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"
      }`;
    },
    [activeHash]
  );

  // Motion variants
  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const navItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.2 + i * 0.08, duration: 0.6 },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0, width: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      width: "auto",
      transition: {
        duration: 0.2,
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      width: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: { opacity: 0, x: 10 },
  };
  return (
    <>
      <motion.header
        className={`sticky top-0 w-full z-50 transition-all duration-300 dark:bg-blue-950 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/80  backdrop-blur-sm"
        }`}
        style={{
          ["--brand"]: colorPalette.brand,
          ["--brand-hover"]: colorPalette.brandHover,
          ["--brand-text"]: colorPalette.brandText,
          ["--brand-light"]: colorPalette.brandLight,
          ["--brand-muted"]: colorPalette.brandMuted,
        }}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <nav className="relative container mx-auto px-2 lg:px-6 flex items-center justify-between gap-10 h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="logo-wrapper">
              <Image
                src="/logos/logo1.png"
                alt="Vehiql Logo"
                height={180}
                width={280}
                className="h-12 md:h-30 md:w-26 object-contain"
                priority
              />
            </div>
          </Link>

          <style jsx>{`
            .logo-wrapper {
              display: inline-block;
              transition: transform 0.3s; /* smooth scaling */
            }

            /* Enlarge on hover */
            .logo-wrapper:hover {
              transform: scale(1.1);
            }

            /* One-time rotation shake on hover */
            .logo-wrapper:hover {
              animation: rotate-shake 0.6s ease-in-out;
            }

            @keyframes rotate-shake {
              0% {
                transform: scale(1.1) rotate(0deg);
              }
              25% {
                transform: scale(1.1) rotate(10deg);
              }
              50% {
                transform: scale(1.1) rotate(-10deg);
              }
              75% {
                transform: scale(1.1) rotate(5deg);
              }
              100% {
                transform: scale(1.1) rotate(0deg);
              }
            }
          `}</style>

          {/* Desktop Nav Items */}
          {(path === "/" || path === "/about") && (
            <ul className="hidden lg:flex items-center gap-6 xl:gap-10 absolute left-1/2 -translate-x-1/2">
              {navItems.map(({ href, label }, index) => (
                <motion.li
                  key={href}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={href}
                    className={navLinkClasses}
                    onClick={() => handleNavClick(href)}
                  >
                    {label}
                    <motion.span
                      className={getUnderlineClasses(href)}
                      style={{ backgroundColor: colorPalette.brand }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Right side buttons */}
          <div className="flex items-center gap-2 lg:gap-2">
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex items-center gap-2 text-foreground cursor-pointer bg-secondary hover:text-primary transition-all
                     dark:bg-black dark:text-white dark:hover:bg-zinc-700"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="md:hidden w-10 h-10 p-0 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <UserButton
                    appearance={{ elements: { avatarBox: "w-10 h-10" } }}
                    afterSignOutUrl="/"
                  />
                </div>
              </>
            ) : (
              <>
                <motion.div whileTap={{ rotate: 180, scale: 0.9 }}>
                  <ThemeToggle />
                </motion.div>
                <SignInButton mode="modal">
                  <button className="signin-btn h-11 px-2 w-20 text-sm font-medium rounded-lg border-2 bg-white text-black transition-all duration-300 hover:bg-blue-300 hover:text-[var(--brand-text)] hover:shadow-md hover:scale-105 active:scale-95">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className=" h-11 px-6 text-sm font-medium rounded-lg border-2 bg-white text-black transition-all duration-300 hover:bg-blue-300 hover:text-[var(--brand-text)] hover:shadow-md hover:scale-105 active:scale-95">
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            )}
            {/* Mobile Menu Toggle */}
            {(path === "/" || path === "/about") && (
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <X className="text-black dark:text-slate-300" />
                  ) : (
                    <Menu className="text-black dark:text-slate-300" />
                  )}
                </AnimatePresence>
              </motion.button>
            )}
            {/* Mobile Menu */}

            <AnimatePresence mode="wait">
              {isMobileMenuOpen && (path === "/" || path === "/about") && (
                <motion.ul
                  role="menu"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                  className="fixed top-16 left-2 right-2 bg-white bg-gradient-to-br 
              dark:from-blue-950 dark:via-background dark:to-blue-900
              rounded-b-lg p-4 lg:hidden z-50  
              shadow-gray-400 flex flex-col 
              gap-6 px-4 py-4 shadow-lg"
                >
                  {navItems.map(({ href, label }, index) => (
                    <motion.li
                      variants={itemVariants}
                      key={href}
                      custom={index}
                    >
                      <Link
                        href={href}
                        className={navLinkClasses}
                        onClick={() => handleNavClick(href)}
                      >
                        {label}
                        <motion.span
                          className={getUnderlineClasses(href)}
                          style={{ backgroundColor: colorPalette.brand }}
                        />
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Loading bar */}
        {!isLoaded && <BarLoader width="100%" color={colorPalette.brand} />}
      </motion.header>
    </>
  );
}

// Utils
function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function getContrastText(hexColor) {
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#111111" : "#FFFFFF";
}

function shadeColor(hex, percent) {
  const color = hex.replace("#", "");
  const num = parseInt(color, 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}
