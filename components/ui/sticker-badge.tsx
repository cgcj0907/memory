import { cn } from "@/lib/utils/cn";

type StickerBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function StickerBadge({ children, className }: StickerBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/70 px-3 py-1 text-xs font-semibold shadow-[0_10px_24px_rgba(255,192,203,0.22)] backdrop-blur-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
