import { PageHeader } from "@/components/layout/page-header";
import { ProfileEditor } from "@/components/profile/profile-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHomeData } from "@/lib/server-data";
import { canReadSpaceContent } from "@/lib/utils/space-access";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { gate, space } = await getHomeData();

  if (gate === "login") {
    redirect("/login");
  }

  if (!canReadSpaceContent(gate)) {
    redirect("/onboarding");
  }

  const member = space.members[0];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader description="把昵称、头像和这本回忆册的个人页整理得更可爱一点。" title="个人资料" />
      <Card>
        <CardHeader>
          <CardTitle>我的小卡片</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileEditor avatarPath={member?.avatarPath} bio="喜欢把一起走过的日常认真收起来。" nickname={member?.nickname} />
        </CardContent>
      </Card>
    </div>
  );
}
