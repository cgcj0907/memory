"use client";

import { motion } from "framer-motion";

import { StickerBadge } from "@/components/ui/sticker-badge";
import { BREAD_LEVEL_MAP, type BreadLevel } from "@/lib/constants/bread-levels";
import { cn } from "@/lib/utils/cn";

type BreadTasteBadgeProps = {
  level: BreadLevel;
  selected?: boolean;
};

export function BreadTasteBadge({ level, selected = false }: BreadTasteBadgeProps) {
  const config = BREAD_LEVEL_MAP[level];

  return (
    <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <StickerBadge
        className={cn(
          config.className,
          selected && "ring-2 ring-pink-300 ring-offset-2 ring-offset-white shadow-[0_12px_28px_rgba(255,143,199,0.35)]"
        )}
      >
        {config.label}
      </StickerBadge>
    </motion.div>
  );
}
