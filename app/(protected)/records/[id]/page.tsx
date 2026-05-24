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
  const images = [record.coverImagePath].filter(Boolean) as string[];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader backHref="/" description="翻开这一页，再看一次这天留下的细节。" title={record.title} />
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
            <div className="rounded-[24px] bg-pink-50/70 p-4 text-sm text-stone-600">时间：{formatDisplayDate(record.eventTime)}</div>
            <div className="rounded-[24px] bg-amber-50/70 p-4 text-sm text-stone-600">地点：{record.locationText || "还没有填写"}</div>
          </div>
          <p className="text-sm leading-7 text-stone-600">{record.description || "先把这一天留在这里，等以后再慢慢补细节。"}</p>
          {record.categorySlug === "bakery" && record.bakeryItems?.length ? (
            <div className="flex flex-col gap-3 rounded-[28px] bg-pink-50/60 p-4">
              <h2 className="text-lg font-semibold text-stone-700">{record.bakeryShopName || "这家面包店"}</h2>
              <div className="flex flex-wrap gap-3">
                {record.bakeryItems.map((item) => (
                  <div key={item.name} className="rounded-[24px] bg-white/80 p-4">
                    <div className="mb-3 font-medium text-stone-700">{item.name}</div>
                    <BreadTasteBadge level={item.tasteLevel} />
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
