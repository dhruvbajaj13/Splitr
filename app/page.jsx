"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/hero";
import { motion } from "framer-motion";

import { STEPS, TESTIMONIALS } from "@/lib/landing";

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
        id="how-it-works"
        className="py-10 bg-blue-50 dark:bg-blue-950/20"
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
            Follow these simple steps to start tracking and splitting <br/> expenses
            with friends :-
          </motion.p>
          <motion.div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3" variants={staggerContainer}>
            {STEPS.map(({ icon, title, description }) => (
              <motion.div key={title} className="flex flex-col items-center space-y-4" variants={itemVariants} whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}>
                <motion.div className="flex h-12 w-12 items-center justify-center border rounded-full bg-blue-200 text-lg font-bold text-blue-800" whileHover={{ rotate: 8 }} transition={{ duration: 0.2 }}>
                  {icon}
                </motion.div>
                <h3 className="text-[22px] font-bold text-foreground">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ───── Testimonials ───── */}
      <motion.section className="bg-gray-50 dark:bg-gray-900/20 py-20" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="container mx-auto px-4 md:px-6 text-center" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <Badge variant="outline" className="bg-blue-100 text-[14px] text-blue-800 mb-[-0.5px] border ">
            Testimonials
          </Badge>
          <motion.h1 className="font-semibold mt-2 text-5xl md:text-4xl text-foreground" variants={itemVariants}>
            What Our Users Say
          </motion.h1>
          <motion.div className="mx-auto mt-8 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
            {TESTIMONIALS.map(({ quote, name, role, image }) => (
              <motion.div key={name} variants={itemVariants} whileHover={{ y: -6, scale: 1.01 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}>
                <Card className="flex flex-col justify-between">
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
                        <p className="text-md font-semibold text-foreground">{name}</p>
                        <p className="text-sm text-muted-foreground font-medium">{role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 px-3">{quote}</p>
                  </CardContent>
                </Card>
              </motion.div>
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Splitr</h2>
            <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
             Settle smarter. Simplify group expenses and stay stress-free with Splitr.
             <br/>Track shared expenses, split bills effortlessly, and settle up quickly. Never worry about who owes who again.
            </p>
          </div>

          
          <div className="ml-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Quick Links</h3>
            <ul className="space-y-2 ">
              <li><a href={"/"} className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">Home</a></li>
              <li><a href="#features" className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">How It Works</a></li>
              <li><a href={"/dashboard"} className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <Link href="#" className="hover:text-blue-400"><img className='h-7 object-fit w-7 rounded-full' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAApVBMVEUIZf/////[...]" /></Link>
              <Link href="#" className="hover:text-pink-400"><img className='h-7 object-fit w-7 rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/640[...]" /></Link>
              <Link href="#" className="hover:text-blue-600"><img className='h-7 object-fit w-7 rounded-full' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIPDw8PEA8QDxAPDw8QEA8VDQ[...]" /></Link>
              <Link href="#" className="hover:text-gray-400"><img className='h-7 object-fit w-7 rounded-full' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAgVBMVEUAAAD////[...]" /></Link>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-2">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-blue-600 hover:underline cursor-pointer">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 hover:underline cursor-pointer">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 mb-1 text-center text-sm border-t font-medium border-gray-400 pt-4 ">
        <p>© {new Date().getFullYear()} Splitr. All Rights Reserved.</p>
        <p className="mt-2">Stay updated! <span className="text-blue-600 underline cursor-pointer">Subscribe to our newsletter.</span></p>
      </div>
      </footer>
    </div>
  );
}
