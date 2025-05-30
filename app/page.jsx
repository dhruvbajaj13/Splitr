import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/hero";

import { STEPS, TESTIMONIALS } from "@/lib/landing";

export default function LandingPage() {

  return (
    <div className="flex flex-col pt-16">
      {/* ───── Hero ───── */}
      <HeroSection />

      {/* ───── How it works ───── */}
      <section id="how-it-works" className="py-10 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-blue-100 text-[14px] text-blue-800 mb-[-0.5px] border ">
            How It Works
          </Badge>
          <h1 className="font-semibold mt-2 text-5xl md:text-4xl">
            Splitting expenses has never been easier
          </h1>
          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Follow these simple steps to start tracking and splitting <br/> expenses
            with friends :-
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {STEPS.map(({ icon, title, description }) => (
              <div key={icon} className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center border rounded-full bg-blue-200 text-lg font-bold text-blue-800">
                  {icon}
                </div>
                <h3 className="text-[22px] font-bold">{title}</h3>
                <p className="text-gray-600 text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Testimonials ───── */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-blue-100 text-[14px] text-blue-800 mb-[-0.5px] border ">
            Testimonials
          </Badge>
          <h1 className="font-semibold mt-2 text-5xl md:text-4xl">
            What Our Users Say
          </h1>

          <div className="mx-auto mt-8 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                  <p className="text-gray-600 px-3">{quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Call‑to‑Action ───── */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white">
            Ready to Simplify Expense Sharing?
          </h2>
          <p className="mx-auto max-w-[600px] text-green-100 md:text-xl/relaxed">
            Join thousands of users who have made splitting expenses
            stress‑free.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 animate-bounce cursor-pointer rounded">
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="text-[#0e0e10] bg-white py-8 px-18">
        <div className="max-w-8xl mx-auto grid md:grid-cols-3 gap-8">
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Splitr</h2>
            <p className="mt-2 text-md text-gray-500">
             Settle smarter. Simplify group expenses and stay stress-free with Splitr.
             <br/>Track shared expenses, split bills effortlessly, and settle up quickly. Never worry about who owes who again.
            </p>
          </div>

          
          <div className="ml-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Quick Links</h3>
            <ul className="space-y-2 ">
              <li><a href={"/"} className="text-gray-700 cursor-pointer hover:underline hover:text-blue-700">Home</a></li>
              <li><a href="#features" className="text-gray-700 cursor-pointer hover:underline hover:text-blue-700">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-700 cursor-pointer hover:underline hover:text-blue-700">How It Works</a></li>
              <li><a href={"/dashboard"} className="text-gray-700 cursor-pointer hover:underline hover:text-blue-700">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <Link href="#" className="hover:text-blue-400"><img className='h-7 object-fit w-7 rounded-full' src="data:image/png;base64,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" alt="" /></Link>
              <Link href="#" className="hover:text-pink-400"><img className='h-7 object-fit w-7 rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/640px-Instagram_logo_2022.svg.png" alt="" /></Link>
              <Link href="#" className="hover:text-blue-600"><img className='h-7 object-fit w-7 rounded-full' src="data:image/jpeg;base64,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" alt="" /></Link>
              <Link href="#" className="hover:text-gray-400"><img className='h-7 object-fit w-7 rounded-full' src="data:image/png;base64,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" alt="" /></Link>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Legal</h3>
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
