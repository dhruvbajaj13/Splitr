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

  // Enhanced color extraction with better sampling and palette generation
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

      // Color frequency analysis
      const colorMap = new Map();
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a > 128) {
          const key = `${Math.floor(r / 8) * 8},${Math.floor(g / 8) * 8},${
            Math.floor(b / 8) * 8
          }`;
          colorMap.set(key, (colorMap.get(key) || 0) + 1);
        }
      }

      // Find dominant color
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hash detection
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    extractColorPalette();
  }, [extractColorPalette]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isMobileMenuOpen && !event.target.closest("nav")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = useMemo(
    () => [
      { href: "#features", label: "Features" },
      { href: "#about", label: "How it works" },
      { href: "#pricing", label: "Pricing" },
      { href: "#testimonials", label: "Testimonials" },
    ],
    []
  );

  const handleNavClick = useCallback((href: string) => {
    setActiveHash(href);
    setIsMobileMenuOpen(false);
  }, []);

  const navLinkClasses = useMemo(
    () =>
      "relative group font-medium transition-all duration-300 text-gray-700 hover:text-gray-900 py-2 px-1",
    []
  );

  const getUnderlineClasses = useCallback(
    (href: string) =>
      `absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${
        activeHash === href
          ? "w-full opacity-100"
          : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"
      }`,
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
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.2 + i * 0.08, duration: 0.6 },
    }),
  };

  return (
    <>
      <motion.header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/80 backdrop-blur-sm"
        }`}
        style={{
          ["--brand" as any]: colorPalette.brand,
          ["--brand-hover" as any]: colorPalette.brandHover,
          ["--brand-text" as any]: colorPalette.brandText,
          ["--brand-light" as any]: colorPalette.brandLight,
          ["--brand-muted" as any]: colorPalette.brandMuted,
        }}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <nav className="relative container mx-auto px-4 lg:px-6 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos/logo1.png"
              alt="Vehiql Logo"
              height={140}
              width={200}
              className="h-12 lg:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav Items */}
          {path === "/" && (
            <ul className="hidden lg:flex items-center gap-8 xl:gap-12 absolute left-1/2 -translate-x-1/2">
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
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex items-center gap-2 text-foreground cursor-pointer bg-secondary hover:text-primary transition-all"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                    <LayoutDashboard className="h-4 w-4" />
                  </Button>
                </Link>
                <UserButton
                  appearance={{
                    elements: { avatarBox: "w-10 h-10" },
                  }}
                  afterSignOutUrl="/"
                />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="signin-btn px-5 py-2.5 text-sm font-medium rounded-lg border-2">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="cta-btn h-11 px-6 text-sm font-medium rounded-lg border-2">
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            )}
            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* Loading bar */}
        {!isLoaded && <BarLoader width="100%" color={colorPalette.brand} />}
      </motion.header>
    </>
  );
}

// Utils
function rgbToHex(r: number, g: number, b: number) {
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

function getContrastText(hexColor: string) {
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#111111" : "#FFFFFF";
}

function shadeColor(hex: string, percent: number) {
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
