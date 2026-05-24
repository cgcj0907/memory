import { PageHeader } from "@/components/layout/page-header";
import { RecordForm } from "@/components/records/record-form";
import { Card, CardContent } from "@/components/ui/card";
import { getRecordById } from "@/lib/server-data";

export default async function EditRecordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await getRecordById(id);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader backHref={`/records/${id}`} description="把这页重新整理一下。" title="编辑记录" />
      <Card>
        <CardContent className="p-6">
          <RecordForm
            defaultValues={{
              title: record.title,
              categorySlug: record.categorySlug,
              eventTime: record.eventTime.slice(0, 16),
              locationText: record.locationText ?? "",
              description: record.description ?? "",
              tags: record.tags,
              coverImagePath: record.coverImagePath ?? "",
              bakeryShopName: record.bakeryShopName ?? "",
              bakeryShopImagePath: record.bakeryShopImagePath ?? "",
              bakeryItems:
                record.bakeryItems?.map((item) => ({
                  name: item.name,
                  imagePath: item.imagePath ?? "",
                  tasteLevel: item.tasteLevel,
                  note: item.note ?? ""
                })) ?? []
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
