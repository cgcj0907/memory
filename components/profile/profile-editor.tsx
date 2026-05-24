"use client";

import { useActionState, useState } from "react";

import { updateProfileAction } from "@/actions/profile";
import { ImageUploader } from "@/components/records/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ProfileEditorProps = {
  nickname?: string | null;
  bio?: string | null;
  avatarPath?: string | null;
};

export function ProfileEditor({ nickname, bio, avatarPath }: ProfileEditorProps) {
  const [state, formAction, pending] = useActionState(updateProfileAction, null);
  const [avatarValue, setAvatarValue] = useState(avatarPath ?? "");

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input defaultValue={nickname ?? ""} name="nickname" placeholder="昵称" />
      <ImageUploader kind="avatar" label="头像" name="avatarPath" onChange={setAvatarValue} value={avatarValue} />
      <Textarea defaultValue={bio ?? ""} name="bio" placeholder="写一点你们的共同小简介" />
      {state?.error ? <p className="text-sm text-rose-500">{state.error}</p> : null}
      {state?.success ? <p className="text-sm text-emerald-500">资料已经保存好了</p> : null}
      <div>
        <Button disabled={pending} type="submit">
          {pending ? "保存中..." : "保存资料"}
        </Button>
      </div>
    </form>
  );
}
