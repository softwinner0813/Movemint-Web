import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-bold focus-visible:outline-none lg:hover:scale-95 disabled:pointer-events-none disabled:opacity-50 transition duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "custom-gradient rounded-full",
        destructive: "custom-gradient",
        outline: "border border-input",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        danger: "bg-danger",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        gray: "bg-gray-dark rounded-full",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2",
        sm: "h-6 rounded-full px-3",
        lg: "h-11 rounded-full px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
