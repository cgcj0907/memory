"use client";

import { toast } from "sonner";

export function softToast(message: string) {
  toast(message, {
    className: "rounded-full border border-white/70 bg-white/90 text-stone-700 shadow-[0_16px_36px_rgba(255,182,193,0.2)]"
  });
}
