"use client";

import { motion } from "framer-motion";

import { StickerBadge } from "@/components/ui/sticker-badge";
import { BREAD_LEVEL_MAP, type BreadLevel } from "@/lib/constants/bread-levels";

type BreadTasteBadgeProps = {
  level: BreadLevel;
};

export function BreadTasteBadge({ level }: BreadTasteBadgeProps) {
  const config = BREAD_LEVEL_MAP[level];

  return (
    <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <StickerBadge className={config.className}>{config.label}</StickerBadge>
    </motion.div>
  );
}
