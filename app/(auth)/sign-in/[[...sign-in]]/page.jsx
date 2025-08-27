import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
   useEffect(()=>{
     document.title='Splitr-Sign In'
   })
  return <SignIn />;
}
