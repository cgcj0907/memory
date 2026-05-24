import { createSpaceAction, joinSpaceAction } from "@/actions/spaces";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getHomeData } from "@/lib/server-data";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const { gate } = await getHomeData();

  if (gate === "login") {
    redirect("/login");
  }

  if (gate === "home") {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader description="先创建一个共同空间，或者输入朋友发来的配对码。" title="回忆小屋准备中" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>创建回忆小屋</CardTitle>
            <CardDescription>给你们的空间起个名字，再贴上一张封面。</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createSpaceAction} className="flex flex-col gap-4">
              <Input name="name" placeholder="比如：糯米收藏夹" />
              <Input name="coverImagePath" placeholder="空间封面图片链接" />
              <Button type="submit">创建空间</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>加入朋友的小屋</CardTitle>
            <CardDescription>把对方发给你的配对码贴进来。</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={joinSpaceAction} className="flex flex-col gap-4">
              <Input name="pairCode" placeholder="输入配对码" />
              <Button type="submit" variant="secondary">
                加入空间
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
