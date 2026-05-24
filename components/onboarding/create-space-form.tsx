"use client";

import { useState } from "react";

import { createSpaceAction } from "@/actions/spaces";
import { ImageUploader } from "@/components/records/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateSpaceForm() {
  const [coverImagePath, setCoverImagePath] = useState("");

  return (
    <form action={createSpaceAction} className="flex flex-col gap-4">
      <Input name="name" placeholder="比如：糯米收藏夹" />
      <ImageUploader
        kind="space-cover"
        label="空间封面"
        name="coverImagePath"
        onChange={setCoverImagePath}
        value={coverImagePath}
      />
      <Button type="submit">创建空间</Button>
    </form>
  );
}
