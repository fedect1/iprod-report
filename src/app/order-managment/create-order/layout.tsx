import StepNavigation from "@/components/form/StepNavigation";
import React from "react";

export default function CreateOrderLayout({ children }: { children: React.ReactNode }) {
    return (

    <div className="w-full px-4 lg:px-0">
      <div className="m-5 flex flex-col text-black lg:flex-row">
        <div className="w-full">{children}</div>
        <StepNavigation/>
      </div>
    </div>

    );
  }