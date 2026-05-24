import * as React from "react";

import { cn } from "@/lib/utils/cn";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[128px] w-full rounded-[24px] border border-pink-100 bg-white/90 px-4 py-3 text-sm leading-6 text-stone-700 shadow-[0_10px_24px_rgba(255,214,231,0.18)] outline-none placeholder:text-stone-400 focus:border-pink-200 focus:ring-2 focus:ring-pink-100",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
