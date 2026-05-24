import Link from "next/link";

import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-pink-500">欢迎回来</CardTitle>
          <CardDescription>继续整理你们一起收藏下来的小片段。</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="flex flex-col gap-4">
            <Input name="email" placeholder="QQ 邮箱" type="email" />
            <Input name="password" placeholder="密码" type="password" />
            <Button type="submit">登录</Button>
          </form>
          <Link className="mt-4 block text-center text-sm text-pink-500" href="/register">
            还没有账号？去注册
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
