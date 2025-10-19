"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import  HeroSection  from "@/components/hero";
import Image from "next/image";
import { motion } from "framer-motion";

import { STEPS, TESTIMONIALS } from "@/lib/landing";


//edit..
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/splitrapp",       // TODO: replace with real page if different
  instagram: "https://www.instagram.com/splitrapp",     // TODO: replace with real page if different
  github: "https://github.com/dhruvbajaj13/Splitr",     // repo link is correct
  x: "https://x.com/splitrapp"                          // TODO: replace with real page if different
};

export default function LandingPage() {

    
  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <div className="flex flex-col">
      {/* ───── Hero ───── */}
      <HeroSection />

      {/* ───── How it works ───── */}
      <motion.section
        id="how-it-work"
        className="py-20 bg-blue-50 dark:bg-blue-950/20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="container mx-auto px-4 md:px-6 text-center" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <Badge variant="outline" className="bg-blue-100 text-[14px] text-blue-800 mb-[-0.5px] border ">
            How It Works
          </Badge>
          <motion.h1 className="font-semibold mt-2 text-5xl md:text-4xl text-foreground" variants={itemVariants}>
            Splitting expenses has never been easier
          </motion.h1>
          <motion.p className="mx-auto mt-3 max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed" variants={itemVariants}>
            Follow these simple steps to start tracking and splitting <br /> expenses
            with friends :-
          </motion.p>

          <motion.div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {STEPS.map(({ icon, title, description, id }) => (
              <div key={id} className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center border rounded-full bg-blue-200 text-lg font-bold text-blue-800">
                  {icon}
                </div>
                <h3 className="text-[22px] font-bold text-foreground">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ───── Testimonials ───── */}
      <motion.section
       id="testimonials"
       className="bg-gray-50 dark:bg-gray-900/20 py-20" 
       variants={sectionVariants} 
       initial="hidden" 
       whileInView="visible" 
       viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="container mx-auto px-4 md:px-6 text-center" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <Badge variant="outline" className="bg-blue-100 text-[14px] text-blue-800 mb-[-0.5px] border ">
            Testimonials
          </Badge>
          <motion.h1 className="font-semibold mt-2 text-5xl md:text-4xl text-foreground" variants={itemVariants}>
            What Our Users Say</motion.h1>


          <motion.div className="mx-auto mt-8 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, role, image }) => (
              <Card key={name} className="flex flex-col justify-between">
                <CardContent className="space-y-4 px-6 pl-3 py-2">

                  <div className="flex items-center space-x-5 mb-8">
                    <Avatar>
                      {/* Placeholder avatar */}
                      <AvatarImage src={image} alt={name} />
                      <AvatarFallback className="uppercase">
                        {name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-md font-semibold">{name}</p>
                      <p className="text-sm text-muted-foreground font-medium">{role}</p>
                    </div>

                  </div>
                  <p className="text-gray-600 dark:text-gray-300 px-3">{quote}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ───── Call‑to‑Action ───── */}
      <motion.section className="py-20 bg-blue-600" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="container mx-auto px-4 md:px-6 text-center space-y-6" variants={staggerContainer}>
          <motion.h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white" variants={itemVariants}>
            Ready to Simplify Expense Sharing?
          </motion.h2>
          <motion.p className="mx-auto max-w-[600px] text-green-100 md:text-xl/relaxed" variants={itemVariants}>
            Join thousands of users who have made splitting expenses
            stress‑free.
          </motion.p>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 animate-bounce cursor-pointer rounded">
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ───── Footer ───── */}
      <footer className="text-[#0e0e10] dark:text-gray-100 bg-white dark:bg-gray-900 py-8 px-18">
        <div className="max-w-8xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="mr-10 pr-10">
            <Image src="/logos/logo1.png" alt="Splitr Logo" width={180} height={60} className="h-14 w-auto object-contain" />
            <p className="mt-2 text-md text-gray-500 dark:text-gray-300">
              Settle smarter. Simplify group expenses and stay stress-free with Splitr.
              <br />Track shared expenses, split bills effortlessly, and settle up quickly. Never worry about who owes who again.
            </p>
          </div>


          <div className="ml-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Quick Links</h3>
            <ul className="space-y-2 ">
              <li><a href={"/"} className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">Home</a></li>
              <li><a href="/about" className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">About Us</a></li>
              <li><a href="#features" className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">Features</a></li>
              <li><a href="#how-it-work" className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">How It Works</a></li>
              <li><a href={"/dashboard"} className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 text-center sm:text-left">Follow Us</h3>
            <div className="flex space-x-6 text-xl justify-center sm:justify-start">
              <a
                href="https://www.linkedin.com/in/dhruvbajaj13/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform transform hover:scale-110 focus:scale-110"
              >
                <img
                  className="h-8 w-8 object-cover rounded-full hover:brightness-110"
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn Logo"
                />
              </a>
              <a
                href="https://github.com/dhruvbajaj13/Splitr"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform transform hover:scale-110 focus:scale-110"
              >
                <img
                  className="h-8 w-8 object-cover rounded-full brightness-0 dark:invert hover:brightness-110"
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  alt="GitHub Repository"
                />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=d4bajaj@gmail.com"
                className="transition-transform transform hover:scale-110 focus:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-8 w-8 object-cover rounded-full hover:brightness-110"
                  src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                  alt="Email"
                />
              </a>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mt-6 mb-2">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-blue-600 hover:underline cursor-pointer">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 hover:underline cursor-pointer">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
      </footer>
    </div>
  );
};
