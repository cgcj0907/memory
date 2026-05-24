import { CategoryEntryGrid } from "@/components/home/category-entry-grid";
import { MemoryWallSection } from "@/components/home/memory-wall-section";
import { SpaceHero } from "@/components/home/space-hero";
import { StatCard } from "@/components/home/stat-card";
import { TimelineList } from "@/components/home/timeline-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHomeData } from "@/lib/server-data";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { gate, space, records } = await getHomeData();

  if (gate === "login") {
    redirect("/login");
  }

  if (gate === "onboarding") {
    redirect("/onboarding");
  }

  const stats = [
    { label: "总回忆", value: records.length },
    { label: "面包店", value: records.filter((item) => item.categorySlug === "bakery").length },
    { label: "去过的地方", value: records.filter((item) => item.categorySlug === "place").length },
    { label: "最近更新", value: records[0]?.eventTime?.slice(5, 10).replace("-", ".") ?? "还没有" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <SpaceHero coverUrl={space.coverImagePath} members={space.members} spaceName={space.name} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>分类入口</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryEntryGrid />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>最近收藏</CardTitle>
        </CardHeader>
        <CardContent>
          <MemoryWallSection items={records} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>共同回忆时间线</CardTitle>
        </CardHeader>
        <CardContent>
          <TimelineList items={records} />
        </CardContent>
      </Card>
    </div>
  );
}
