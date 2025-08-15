"use client";

import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed pt-2 top-0 w-full border-b bg-background/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/logos/logo1.png"}
            alt="Vehiql Logo"
            height={140} width={200} className='h-28 w-auto ml-4 object-contain'
          />
        </Link>

        {path === "/" && (
          <div className="hidden md:flex items-center gap-10 ">
            <Link
              href="#features"
              className="text-[18px] font-medium hover:text-blue-700 dark:hover:text-blue-400 ml-14 hover:underline transition"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-[18px] font-medium hover:text-blue-700 dark:hover:text-blue-400 hover:underline transition"
            >
              How It Works
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Authenticated>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 text-foreground cursor-pointer bg-secondary hover:text-primary transition-all">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </Authenticated>

          <Unauthenticated>
            <SignInButton>
              <Button variant="ghost" className="cursor-pointer text-[15px]">Sign In</Button>
            </SignInButton>

            <SignUpButton>
              <Button className="bg-primary hover:bg-primary/90 cursor-pointer border-none">
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
      </nav>
      {isLoading && <BarLoader width={"100%"} color="#7762E2" />}
    </header>
  );
}
