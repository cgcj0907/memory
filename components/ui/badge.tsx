import * as React from "react";

import { cn } from "@/lib/utils/cn";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/70 px-3 py-1 text-xs font-semibold text-stone-600",
        className
      )}
      {...props}
    />
  );
}
