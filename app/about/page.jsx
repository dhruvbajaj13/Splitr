"use client";

import Link from "next/link";
import { ArrowRight, Users, Heart, Shield, Target, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const VALUES = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community First",
    description: "We believe in building tools that bring people together rather than create friction in relationships."
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Simplicity",
    description: "Complex problems deserve simple solutions. We focus on making expense sharing effortless and intuitive."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Transparency",
    description: "No hidden fees, no complicated algorithms. Just honest, transparent expense tracking for everyone."
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Innovation",
    description: "We continuously evolve and improve based on user feedback and emerging technologies."
  }
];

export default function AboutPage() {
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
      {/* Hero Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="container mx-auto px-4 md:px-6 text-center" variants={staggerContainer}>
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="bg-blue-100 text-[14px] text-blue-800 mb-4 border">
              About Splitr
            </Badge>
          </motion.div>
          <motion.h1 className="font-semibold text-5xl md:text-6xl text-foreground mb-6" variants={itemVariants}>
            Making expense sharing <br />
            <span className="text-blue-600">simple and fair</span>
          </motion.h1>
          <motion.p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 text-xl leading-relaxed mb-8" variants={itemVariants}>
            We&apos;re on a mission to eliminate the awkwardness of splitting bills and tracking shared expenses. 
            Splitr helps friends, roommates, and groups stay organized and maintain healthy financial relationships.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/dashboard">
                Try Splitr Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        className="py-20 bg-white dark:bg-gray-900"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="container mx-auto px-4 md:px-6" variants={staggerContainer}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <Badge variant="outline" className="bg-blue-100 text-[14px] text-blue-800 mb-4 border">
                Our Story
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Born from real frustration
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  Splitr was born out of a simple yet universal problem: the awkwardness of splitting bills with friends. 
                  We&apos;ve all been there – trying to figure out who owes what after a group dinner, keeping track of 
                  shared apartment expenses, or managing costs for a group trip.
                </p>
                <p>
                  Traditional methods like splitting bills equally or keeping mental notes often lead to confusion, 
                  forgotten debts, and sometimes strained relationships. We realized there had to be a better way.
                </p>
                <p>
                  That&apos;s when Splitr was conceived – a simple, transparent, and fair way to track and split expenses 
                  among groups, ensuring everyone pays their fair share without the hassle.
                </p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero.jpeg"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Our Values Section */}
     <motion.section
  className="py-20 bg-gray-50 dark:bg-gray-900/20"
  variants={sectionVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  <motion.div
    className="container mx-auto px-4 md:px-6 text-center"
    variants={staggerContainer}
  >
    <motion.div variants={itemVariants}>
      <Badge
        variant="outline"
        className="bg-blue-100 text-[14px] text-blue-800 mb-4 border"
      >
        Our Values
      </Badge>
    </motion.div>
    <motion.h2
      className="font-semibold text-5xl md:text-4xl text-foreground mb-4"
      variants={itemVariants}
    >
      What drives us forward
    </motion.h2>
    <motion.p
      className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed mb-12"
      variants={itemVariants}
    >
      Our core values shape every decision we make and every feature we build.
    </motion.p>

    <motion.div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
      {VALUES.map(({ icon, title, description }) => (
        <motion.div
          key={title}
          variants={itemVariants}
          whileHover={{
            scale: 1.07,
            boxShadow: "0 8px 32px rgba(37, 99, 235, 0.16)",
            transition: {
              type: "spring",
              stiffness: 320,
              damping: 22,
              duration: 0.22,
            },
          }}
          className="group flex flex-col items-center space-y-4 p-6 rounded-xl shadow-lg transition-colors duration-300 bg-white dark:bg-blue-950/30 cursor-pointer border border-gray-100 dark:border-gray-700"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:text-blue-800 dark:group-hover:text-blue-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
            {description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</motion.section>


      {/* Call-to-Action Section */}
      <motion.section 
        className="py-20 bg-blue-600" 
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="container mx-auto px-4 md:px-6 text-center space-y-6" variants={staggerContainer}>
          <motion.h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white" variants={itemVariants}>
            Ready to join the Splitr community?
          </motion.h2>
          <motion.p className="mx-auto max-w-[600px] text-blue-100 md:text-xl/relaxed" variants={itemVariants}>
            Start tracking and splitting expenses with your friends today. It&apos;s free, easy, and designed to keep relationships healthy.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" className="bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="https://github.com/dhruvbajaj13/Splitr" target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
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
            <ul className="space-y-2">
              <li><Link href={"/"} className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">Home</Link></li>
              <li><Link href="/about" className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">About Us</Link></li>
              <li><Link href="/#features" className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">Features</Link></li>
              <li><Link href="/#how-it-work" className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">How It Works</Link></li>
              <li><Link href={"/dashboard"} className="text-gray-700 dark:text-gray-300 cursor-pointer hover:underline hover:text-blue-700 dark:hover:text-blue-400">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <a
                href="https://www.linkedin.com/in/dhruvbajaj13/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <img
                  className="h-7 w-7 object-cover rounded-full"
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn Logo"
                />
              </a>
              <a
                href="https://github.com/dhruvbajaj13/Splitr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <img
                  className="h-7 w-7 object-cover rounded-full"
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  alt="GitHub Repository"
                />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=d4bajaj@gmail.com"
                className="hover:text-gray-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-7 w-7 object-cover rounded-full"
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

        <div className="mt-10 mb-1 text-center text-sm border-t font-medium border-gray-400 pt-4">
          <p>© {new Date().getFullYear()} Splitr. All Rights Reserved.</p>
          <p className="mt-2">Stay updated!
            <a href="#" className="text-blue-600 underline cursor-pointer">
              Subscribe to our newsletter.
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
