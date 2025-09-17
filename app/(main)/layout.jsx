"use client";

import { Authenticated } from "convex/react";
import { UserInitializer } from "@/components/user-initializer";
import React from "react";

const MainLayout = ({ children}) => {
  return (
    <Authenticated>
      <UserInitializer>
        <div className="container mx-auto mt-24 mb-20 px-4 bg-background min-h-screen">
          {children}
        </div>
      </UserInitializer>
    </Authenticated>
  );
};

export default MainLayout;
