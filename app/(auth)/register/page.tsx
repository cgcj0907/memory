import Link from "next/link";

import { registerAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-pink-500">一起开始收集回忆</CardTitle>
          <CardDescription>先注册账号，再把这本朋友手账慢慢填满。</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerAction} className="flex flex-col gap-4">
            <Input name="email" placeholder="QQ 邮箱" type="email" />
            <Input name="password" placeholder="密码" type="password" />
            <Input name="confirmPassword" placeholder="确认密码" type="password" />
            <Input defaultValue="0907" name="inviteCode" placeholder="邀请码" />
            <Button type="submit">注册</Button>
          </form>
          <Link className="mt-4 block text-center text-sm text-pink-500" href="/login">
            已经有账号了？去登录
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
