import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/hero";

import { STEPS, TESTIMONIALS } from "@/lib/landing";

//edit..
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/splitrapp",       // TODO: replace with real page if different
  instagram: "https://www.instagram.com/splitrapp",     // TODO: replace with real page if different
  github: "https://github.com/dhruvbajaj13/Splitr",     // repo link is correct
  x: "https://x.com/splitrapp"                          // TODO: replace with real page if different
};


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
            {STEPS.map(({ icon, title, description }, index) => (
              <div key={`${title}-${index}`} className="flex flex-col items-center space-y-4">
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
            {TESTIMONIALS.map(({ quote, name, role, image }, index) => (
              <Card key={`${name}-${index}`} className="flex flex-col justify-between">
                <CardContent className="space-y-4 px-6 pl-3 py-2">
                  <div className="flex items-center space-x-5 mb-8">
                    <Avatar>
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
          <div className="mr-10 pr-10">
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
              {/* edit */}
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:opacity-80 focus:outline-none focus:ring"
                title="Facebook"
              >
                <img
                  className="h-7 w-7 rounded-full object-cover"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                />
              </a>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-80 focus:outline-none focus:ring"
                title="Instagram"
              >
                <img
                  className="h-7 w-7 rounded-full object-cover"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/640px-Instagram_logo_2022.svg.png"
                  alt="Instagram"
                />
              </a>

              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:opacity-80 focus:outline-none focus:ring"
                title="GitHub"
              >
                <img
                  className="h-7 w-7 rounded-full object-cover"
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  alt="GitHub"
                />
              </a>

              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:opacity-80 focus:outline-none focus:ring"
                title="X (Twitter)"
              >
               <img
                className="h-7 w-7 rounded-full object-cover"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg" 
                alt="X (Twitter)"      
              />
              </a>
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
