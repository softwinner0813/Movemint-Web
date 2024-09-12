"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(
  ({ className, iconClassName, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-6 w-6 shrink-0 border-2 border-foreground disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className={cn("h-4 w-4", iconClassName)} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
