"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FEATURES,statsData } from "@/lib/landing";
import Link from "next/link";


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

  return (
    <div>
       <section className="mt-20 pb-12 space-y-10 md:space-y-15 px-5">
        <div className="container mx-auto px-6 md:px-6 text-center  space-y-6">
          <Badge variant="outline" className="bg-blue-100 text-[14px] text-blue-800 mb-[-0.5px] border  ">
            Split expenses. Simplify life.
          </Badge>

          <h1 className="gradient-title mx-auto max-w-[1200px] text-5xl  font-bold md:text-8xl ">
            The Smartest Way Of <br/> Splitting Bills With Friends
          </h1>

          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed text-xl  mt-5 mb-8 font-medium">
            Track shared expenses, split bills effortlessly, and settle up
            quickly. Never worry about who owes who again.
          </p>

          <div className="flex flex-col items-center gap-10 sm:flex-row justify-center ">
            <Button
              asChild
              size="lg"
              className="px-10 text-[16px] font-semibold hover:bg-black hover:text-white rounded hover:scale-115 transition-all duration-500"
            >
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-6  text-[16px] font-semibold border-2  rounded hover:scale-115 transition-all duration-500"
            >
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>

        <div className="hero-image-wrapper container mx-auto max-w-[1120px] overflow-hidden  shadow-2xl">
          <div ref={imageRef} className="hero-image ">
            <Image
              src="/hero.jpeg"
              width={1280}
              height={720}
              alt="Banner"
              className="h-160 w-340  shadow-2xl border mx-auto mb-6"
              priority
            />
          </div>
        </div>
      </section>

      {/*----------Stats Section--------*/}
      <section className="py-14 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((statsData,index)=>(
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{statsData.value}</div>
                <div className="text-gray-600 font-medium">{statsData.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* ───── Features ───── */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          {/* Section Badge */}
          <Badge
            variant="outline"
            className="bg-blue-100 text-[14px] text-blue-800 mb-[-0.5px] border"
          >
            Features
          </Badge>

          {/* Title */}
          <h1 className="mt-2 text-4xl font-semibold md:text-4xl">
            Everything you need to Split Expenses
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Our platform provides all the tools you need to handle <br />
            shared expenses with ease.
          </p>

          {/* Features Grid */}
          <div className="mx-auto mt-12 grid max-w-[1120px] gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ title, Icon, bg, color, description }) => (
              <Card
                key={title}
                className="
            flex flex-col items-center space-y-4 p-6 
            bg-white rounded-xl 
            shadow-md hover:shadow-xl 
            transform transition-all duration-300 
            hover:scale-105 
            cursor-pointer text-center
          "
              >
                {/* Icon Wrapper */}
                <div
                  className={`rounded-full p-4 transition-all duration-300 transform hover:rotate-6 ${bg}`}
                >
                  <Icon
                    className={`h-8 w-8 ${color} transition-colors duration-300`}
                  />
                </div>

                {/* Feature Title */}
                <h3 className="text-[22px] font-bold transition-colors duration-300 hover:text-blue-600">
                  {title}
                </h3>

                {/* Feature Description */}
                <p className="text-gray-600">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
