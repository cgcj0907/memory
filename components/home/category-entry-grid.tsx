import Link from "next/link";
import { Croissant, MapPin, Sparkles, UtensilsCrossed } from "lucide-react";

import { CATEGORY_OPTIONS } from "@/lib/constants/categories";

const iconMap = {
  bakery: Croissant,
  restaurant: UtensilsCrossed,
  place: MapPin,
  moment: Sparkles
};

export function CategoryEntryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {CATEGORY_OPTIONS.map((category) => {
        const Icon = iconMap[category.slug];

        return (
          <Link
            key={category.slug}
            className="rounded-[26px] border border-white/70 bg-white/85 p-4 shadow-[0_18px_40px_rgba(255,214,231,0.22)]"
            href={`/categories?category=${category.slug}`}
          >
            <div className="flex flex-col gap-3">
              <span className={`inline-flex size-10 items-center justify-center rounded-2xl ${category.color}`}>
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-medium text-stone-700">{category.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
