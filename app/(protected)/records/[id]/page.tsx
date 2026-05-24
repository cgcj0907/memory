import Link from "next/link";
import { CalendarHeart, MapPin, Pencil } from "lucide-react";
import { BreadTasteBadge } from "@/components/bakery/bread-taste-badge";
import { PageHeader } from "@/components/layout/page-header";
import { RecordGallery } from "@/components/records/record-gallery";
import { StickerBadge } from "@/components/ui/sticker-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDisplayDate } from "@/lib/utils/date";
import { getRecordById } from "@/lib/server-data";

export default async function RecordDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await getRecordById(id);
  
  const allImages = [
    record.coverImagePath,
    record.bakeryShopImagePath,
    ...(record.bakeryItems?.map((item) => item.imagePath) || [])
  ].filter(Boolean) as string[];

  const images = Array.from(new Set(allImages));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        action={
          <Link
            className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-pink-500 shadow-[0_10px_24px_rgba(255,214,231,0.2)] transition-transform hover:scale-105"
            href={`/records/${record.id}/edit`}
          >
            <Pencil className="size-3.5" />
            编辑
          </Link>
        }
        backHref="/"
        description="跑步取面包 go！go！go！"
        title={record.title}
      />
      <RecordGallery images={images} />
      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="flex flex-wrap gap-2">
            {record.tags.map((tag) => (
              <StickerBadge key={tag} className="bg-pink-100 text-pink-600">
                {tag}
              </StickerBadge>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-2 rounded-[24px] bg-pink-50/70 p-4 text-sm text-stone-600">
              <CalendarHeart className="size-4 text-pink-400" />
              {formatDisplayDate(record.eventTime)}
            </div>
            <div className="flex items-center gap-2 rounded-[24px] bg-amber-50/70 p-4 text-sm text-stone-600">
              <MapPin className="size-4 text-amber-400" />
              {record.locationText || "还没有填写"}
            </div>
          </div>
          {record.categorySlug === "bakery" && record.bakeryItems?.length ? (
            <div className="flex flex-col gap-3 rounded-[28px] bg-pink-50/60 p-4">
              <div className="flex items-center gap-3">
                {record.bakeryShopImagePath ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[12px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={record.bakeryShopName || "这家面包店"} className="h-full w-full object-cover" src={record.bakeryShopImagePath} />
                  </div>
                ) : null}
                <h2 className="text-lg font-semibold text-stone-700">{record.bakeryShopName || "这家面包店"}</h2>
              </div>
              <div className="flex flex-col gap-3">
                {record.bakeryItems.map((item) => (
                  <div key={item.name} className="flex gap-4 rounded-[24px] bg-white/80 p-4">
                    {item.imagePath ? (
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[16px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt={item.name} className="h-full w-full object-cover" src={item.imagePath} />
                      </div>
                    ) : null}
                    <div className="flex flex-col justify-center gap-2">
                      <div className="font-medium text-stone-700">{item.name}</div>
                      <div>
                        <BreadTasteBadge level={item.tasteLevel} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
