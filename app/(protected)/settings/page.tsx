import { signOutAction } from "@/actions/auth";
import { PageHeader } from "@/components/layout/page-header";
import { PasswordForm } from "@/components/profile/password-form";
import { PairCodeDisplay } from "@/components/settings/pair-code-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getHomeData } from "@/lib/server-data";
import { canReadSpaceContent } from "@/lib/utils/space-access";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { gate, space, authUser } = await getHomeData();

  if (gate === "login" || !authUser) {
    redirect("/login");
  }

  const hasSpace = canReadSpaceContent(gate);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader description="这里放一些账号和空间相关的基础设置。" title="设置" />
      <Card>
        <CardHeader>
          <CardTitle>登录信息</CardTitle>
          <CardDescription>当前账号状态。</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm text-stone-600">
          <div>账号邮箱：{authUser.email}</div>
          <form action={signOutAction}>
            <Button type="submit" variant="secondary">
              退出登录
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasSpace && (
        <Card>
          <CardHeader>
            <CardTitle>共同空间</CardTitle>
            <CardDescription>把你们的小屋信息记在这里。</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-stone-600">
            <div>空间名：{space.name}</div>
            <div className="flex flex-col gap-2">
              <span>配对码：</span>
              <PairCodeDisplay value={space.pairCode} />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>账号安全</CardTitle>
          <CardDescription>可以在这里更新登录密码。</CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
