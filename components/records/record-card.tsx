import Link from "next/link";
import Image from "next/image";

import { StickerBadge } from "@/components/ui/sticker-badge";
import { CATEGORY_OPTIONS } from "@/lib/constants/categories";
import { formatDisplayDate } from "@/lib/utils/date";
import type { RecordItem } from "@/types/app";

export function RecordCard({ item }: { item: RecordItem }) {
  const category = CATEGORY_OPTIONS.find((option) => option.slug === item.categorySlug);

  return (
    <Link
      className="group overflow-hidden rounded-[30px] border border-white/70 bg-white/85 shadow-[0_20px_50px_rgba(255,214,231,0.22)] transition hover:-translate-y-1"
      href={`/records/${item.id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-pink-50">
        {item.coverImagePath ? (
          <Image
            alt={item.title}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            src={item.coverImagePath}
          />
        ) : null}
        {category ? <StickerBadge className={`absolute left-4 top-4 ${category.color}`}>{category.name}</StickerBadge> : null}
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-stone-700">{item.title}</h3>
        <p className="text-sm text-stone-500">{item.locationText || "一起走过的地方，慢慢变成纪念。"}</p>
        <div className="flex items-center justify-between gap-3 pt-2 text-xs text-stone-400">
          <span>{formatDisplayDate(item.eventTime)}</span>
          <span>{item.tags.slice(0, 2).join(" · ") || "还没贴标签"}</span>
        </div>
      </div>
    </Link>
  );
}
