"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FEATURES, statsData } from "@/lib/landing";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const subtitleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.5 + (i * 0.1),
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }),
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const statItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const featuresVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const featureCardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Text Section with texture */}
      <div
        className="relative pt-10 bg-gradient-to-br from-blue-50 via-white to-blue-100/50 dark:from-blue-950 dark:via-background dark:to-blue-900/40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.15) 3px, transparent 3px),
            radial-gradient(circle at 75px 75px, rgba(147, 197, 253, 0.12) 2px, transparent 2px),
            linear-gradient(45deg, rgba(59, 130, 246, 0.08) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(147, 197, 253, 0.06) 25%, transparent 25%),
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(59, 130, 246, 0.03) 40px, rgba(59, 130, 246, 0.03) 42px)
          `,
          backgroundSize: '50px 50px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '0 0, 0 0, 0 0, 10px 10px'
        }}
      >
        <section className="pb-6 space-y-10 md:space-y-15 px-5 relative z-10">
          <div className="container mx-auto px-6 md:px-6 text-center space-y-12">
            <motion.div variants={badgeVariants}>
              <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/20 text-[14px] text-blue-800 dark:text-blue-300 mb-[-0.5px] border">
                Split expenses. Simplify life.
              </Badge>
            </motion.div>

            <motion.h1
              variants={titleVariants}
              className="gradient-title mx-auto max-w-[1200px] text-5xl font-bold md:text-8xl dark:text-blue-100"
            >
              The Smartest Way Of <br /> Splitting Bills With Friends
            </motion.h1>

            <motion.p
              variants={subtitleVariants}
              className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed text-xl mt-5 mb-8 font-medium"
            >
              Track shared expenses, split bills effortlessly, and settle up
              quickly. Never worry about who owes who again.
            </motion.p>

            <motion.div
              className="flex flex-col items-center gap-10 sm:flex-row justify-center mt-16"
              variants={itemVariants}
            >
              <motion.div
                custom={0}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  asChild
                  size="lg"
                  className="px-12 py-4 text-[18px] font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
                >
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                custom={1}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-10 py-4 text-[18px] font-semibold border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
                >
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-blue-50 dark:bg-blue-950/20"
        variants={statsVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map(({ id, value, label }) => (
              <motion.div
                key={id}
                className="text-center group"
                variants={statItemVariants}
                whileHover="hover"
              >
                <div className="bg-white dark:bg-blue-900/30 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-blue-800 hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{value}</div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.div
        className="text-center mb-12"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-blue-200 mb-4">
          Trusted by Thousands
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Join our growing community of users who trust Splitr for their expense management
        </p>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        className="hero-image-wrapper container mx-auto max-w-[1120px] overflow-hidden"
        variants={imageVariants}
        whileHover="hover"
      >
        <div ref={imageRef} className="hero-image">
          <Image
            src="/hero.jpeg"
            width={1280}
            height={720}
            alt="Banner"
            className="h-160 w-340 mx-auto mb-6"
            priority
          />
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        id="features"
        className="bg-background dark:bg-blue-950/20 py-20"
        variants={featuresVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          {/* Section Badge */}
          <motion.div variants={badgeVariants}>
            <Badge
              variant="outline"
              className="bg-blue-100 dark:bg-blue-900/20 text-[14px] text-blue-800 dark:text-blue-300 mb-[-0.5px] border"
            >
              Features
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={titleVariants}
            className="mt-2 text-4xl font-semibold md:text-4xl text-foreground dark:text-blue-100"
          >
            Everything you need to Split Expenses
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={subtitleVariants}
            className="mx-auto mt-3 max-w-[700px] text-muted-foreground dark:text-gray-300 md:text-xl/relaxed"
          >
            Our platform provides all the tools you need to handle <br />
            shared expenses with ease.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            className="mx-auto mt-12 grid max-w-[1120px] gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={itemVariants}
          >
            {FEATURES.map(({ id, title, Icon, bg, color, description }, index) => (
              <motion.div
                key={id}
                variants={featureCardVariants}
                whileHover="hover"
                custom={index}
              >
                <Card className="
                  flex flex-col items-center space-y-4 p-6 
                  bg-card dark:bg-blue-900/40 rounded-xl 
                  shadow-md hover:shadow-xl 
                  transform transition-all duration-300 
                  cursor-pointer text-center
                ">
                  {/* Icon Wrapper */}
                  <motion.div
                    className={`rounded-full p-4 transition-all duration-300 transform hover:rotate-6 ${bg}`}
                    whileHover={{ rotate: 6, scale: 1.1 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Icon
                      className={`h-8 w-8 ${color} transition-colors duration-300`}
                    />
                  </motion.div>

                  {/* Feature Title */}
                  <h3 className="text-[22px] font-bold transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400 text-foreground dark:text-blue-100">
                    {title}
                  </h3>

                  {/* Feature Description */}
                  <p className="text-muted-foreground dark:text-gray-300">{description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HeroSection;
