"use client";


import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export function UserInitializer({ children }) {
  const { isSignedIn, isLoaded } = useUser();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      storeUser().catch((error) => {  //store user in convex db once they're logged in using clerk.
        console.error("Failed to initialize user:", error);
      });
    }
  }, [isLoaded, isSignedIn, storeUser]);

  return children;
}