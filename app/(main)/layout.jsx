"use client";

import { Authenticated } from "convex/react";
import React, { useEffect, useState } from "react";


const MainLayout = ({ children}) => {

  return (
    <Authenticated>
      <div className="container mx-auto mt-24 mb-20 px-4 bg-background min-h-screen">
        {children}
      </div>
    </Authenticated>
  );
};

export default MainLayout;
