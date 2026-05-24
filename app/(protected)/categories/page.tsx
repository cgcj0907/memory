import { EmptyState } from "@/components/ui/empty-state";
import { MemoryWallSection } from "@/components/home/memory-wall-section";
import { PageHeader } from "@/components/layout/page-header";
import { getHomeData } from "@/lib/server-data";

export default async function CategoriesPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string; keyword?: string }>;
}) {
  const params = await searchParams;
  const { records } = await getHomeData();
  const filtered = records.filter((record) => {
    const categoryMatched = params.category ? record.categorySlug === params.category : true;
    const keyword = params.keyword?.trim().toLowerCase();
    const keywordMatched = keyword
      ? [record.title, record.locationText, record.description, record.tags.join(" ")].join(" ").toLowerCase().includes(keyword)
      : true;
    return categoryMatched && keywordMatched;
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader description="按分类慢慢翻，找到想回看的那一页。" title="分类回忆册" />
      {filtered.length > 0 ? (
        <MemoryWallSection items={filtered} />
      ) : (
        <EmptyState description="这一类回忆还空着，等下一次出发时再贴进来。" title="这里还没有内容" />
      )}
    </div>
  );
}
