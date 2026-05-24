"use client";

import { useActionState } from "react";

import { updatePasswordAction } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(updatePasswordAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input name="password" placeholder="新密码" type="password" />
      <Input name="confirmPassword" placeholder="确认新密码" type="password" />
      {state?.error ? <p className="text-sm text-rose-500">{state.error}</p> : null}
      {state?.success ? <p className="text-sm text-emerald-500">密码已经更新好了</p> : null}
      <div>
        <Button disabled={pending} type="submit">
          {pending ? "更新中..." : "修改密码"}
        </Button>
      </div>
    </form>
  );
}
