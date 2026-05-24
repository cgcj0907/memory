"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,#ff8fc7_0%,#ffb4d9_100%)] text-white shadow-[0_12px_24px_rgba(255,143,199,0.35)]",
        secondary: "bg-white/80 text-stone-700 shadow-[0_10px_22px_rgba(255,214,231,0.32)]",
        ghost: "bg-transparent text-pink-500 shadow-none"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4",
        lg: "h-12 px-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), "transition-transform hover:-translate-y-0.5 active:scale-[0.98]", className)}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
