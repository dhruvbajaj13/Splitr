"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { isLoading } = useStoreUser();
  const [activeHash, setActiveHash] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [colorPalette, setColorPalette] = useState({
    brand: "#111111",
    brandText: "#FFFFFF",
    brandHover: "#000000",
    brandLight: "#f8f9fa",
    brandMuted: "#6b7280"
  });

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
        
        if (a > 128) { // Only consider opaque pixels
          const key = `${Math.floor(r/8)*8},${Math.floor(g/8)*8},${Math.floor(b/8)*8}`;
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
        const [r, g, b] = dominantColor.split(',').map(Number);
        const brandHex = rgbToHex(r, g, b);
        
        setColorPalette({
          brand: brandHex,
          brandText: getContrastText(brandHex),
          brandHover: shadeColor(brandHex, -15),
          brandLight: shadeColor(brandHex, 85),
          brandMuted: shadeColor(brandHex, 40)
        });
      }
    } catch (error) {
      console.warn('Color extraction failed:', error);
    }
  }, []);

  // Scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hash detection for active navigation
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    extractColorPalette();
  }, [extractColorPalette]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navItems = useMemo(() => [
    { href: "#features", label: "Features" },
    { href: "#about", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" }
  ], []);

  const handleNavClick = useCallback((href) => {
    setActiveHash(href);
    setIsMobileMenuOpen(false);
  }, []);

  const navLinkClasses = useMemo(() => 
    "relative group font-medium transition-all duration-300 text-gray-700 hover:text-gray-900 py-2 px-1"
  , []);

  const getUnderlineClasses = useCallback((href) => 
    `absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${
      activeHash === href 
        ? "w-full opacity-100" 
        : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"
    }`
  , [activeHash]);

  // Animation variants
  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth entrance
      }
    }
  };

  const navItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2 + (i * 0.08),
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const logoVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.95, opacity: 0, y: -5 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + (i * 0.1),
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }),
    hover: {
      scale: 1.02,
      y: -1,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const mobileMenuItemVariants = {
    hidden: { x: -15, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const menuButtonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <>
      <motion.header 
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        style={{ 
          '--brand': colorPalette.brand,
          '--brand-hover': colorPalette.brandHover,
          '--brand-text': colorPalette.brandText,
          '--brand-light': colorPalette.brandLight,
          '--brand-muted': colorPalette.brandMuted
        }}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <nav className="relative container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Link href="/" className="flex items-center gap-2 z-10 relative group">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="/logos/logo1.png"
                    alt="Vehiql Logo"
                    height={190}
                    width={250}
                    className="h-12 lg:h-16 w-auto object-contain transition-transform duration-300"
                    priority
                  />
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8 xl:gap-12 absolute left-1/2 -translate-x-1/2">
              {navItems.map(({ href, label }, index) => (
                <motion.li 
                  key={href}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: activeHash === href ? 1 : 0,
                        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                      }}
                      whileHover={{ 
                        scaleX: 1,
                        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                      }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.div
                custom={0}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <SignInButton mode="modal">
                  <button className="signin-btn px-5 py-2.5 text-sm font-medium rounded-lg border-2 transition-all duration-300 hover:shadow-md">
                    Sign in
                  </button>
                </SignInButton>
              </motion.div>
              <motion.div
                custom={1}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <SignUpButton mode="modal">
                  <Button className="cta-btn h-11 px-6 text-sm font-medium rounded-lg border-2 transition-all duration-300 hover:shadow-lg">
                    Get Started
                  </Button>
                </SignUpButton>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 z-10 relative"
              aria-label="Toggle menu"
              variants={menuButtonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
                             <AnimatePresence mode="wait">
                 {isMobileMenuOpen ? (
                   <motion.div
                     key="close"
                     initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
                     animate={{ rotate: 0, opacity: 1, scale: 1 }}
                     exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
                     transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                   >
                     <X className="w-6 h-6" />
                   </motion.div>
                 ) : (
                   <motion.div
                     key="menu"
                     initial={{ rotate: 45, opacity: 0, scale: 0.8 }}
                     animate={{ rotate: 0, opacity: 1, scale: 1 }}
                     exit={{ rotate: -45, opacity: 0, scale: 0.8 }}
                     transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                   >
                     <Menu className="w-6 h-6" />
                   </motion.div>
                 )}
               </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                className="lg:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="container mx-auto px-4 py-6">
                  <ul className="space-y-4 mb-6">
                    {navItems.map(({ href, label }, index) => (
                      <motion.li 
                        key={href}
                        variants={mobileMenuItemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                      >
                        <Link 
                          href={href} 
                          className="block py-3 px-2 text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-100 last:border-b-0"
                          onClick={() => handleNavClick(href)}
                        >
                          {label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.div 
                    className="flex flex-col gap-3"
                    variants={mobileMenuItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={navItems.length}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SignInButton mode="modal">
                        <button className="signin-btn w-full py-3 px-4 text-base font-medium rounded-lg border-2 transition-all duration-300">
                          Sign in
                        </button>
                      </SignInButton>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SignUpButton mode="modal">
                        <Button className="cta-btn w-full h-12 text-base font-medium rounded-lg border-2 transition-all duration-300">
                          Get Started
                        </Button>
                      </SignUpButton>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BarLoader 
              width="100%" 
              color={colorPalette.brand}
              height={3}
              cssOverride={{ position: 'absolute', bottom: 0 }}
            />
          </motion.div>
        )}
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        .signin-btn {
          color: var(--brand);
          border-color: var(--brand);
          background-color: transparent;
        }
        .signin-btn:hover {
          background-color: var(--brand);
          color: var(--brand-text);
          border-color: var(--brand);
        }
        .cta-btn {
          background-color: var(--brand);
          color: var(--brand-text);
          border-color: var(--brand);
        }
        .cta-btn:hover {
          background-color: var(--brand-hover);
          border-color: var(--brand-hover);
          color: var(--brand-text);
        }
      `}</style>
    </>
  );
}

// Enhanced utility functions
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

function getContrastText(hexColor) {
  const color = hexColor.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Use relative luminance for better contrast calculation
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#111111" : "#FFFFFF";
}

function shadeColor(hex, percent) {
  const color = hex.replace('#', '');
  const num = parseInt(color, 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16)
    .slice(1);
}