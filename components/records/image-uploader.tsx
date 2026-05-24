"use client";

import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { buildStoragePath, STORAGE_BUCKET } from "@/lib/utils/storage";
import { convertImageFileToWebp } from "@/lib/utils/webp-upload";

type ImageUploaderProps = {
  value?: string;
  onChange: (value: string) => void;
  label: string;
  kind?: "avatar" | "space-cover" | "record" | "bakery-item" | "bakery-shop";
  name?: string;
  showUrlInput?: boolean;
};

export function ImageUploader({
  value,
  onChange,
  label,
  kind = "record",
  name,
  showUrlInput = false
}: ImageUploaderProps) {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const supabase = createClient();

    if (!supabase) {
      setUploadError("还没配置 Supabase，先用图片链接也可以。");
      return;
    }

    setUploadError("");
    setIsUploading(true);

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      setUploadError("请先登录后再上传图片。");
      setIsUploading(false);
      return;
    }

    const webpFile = await convertImageFileToWebp(file);
    const filePath = buildStoragePath(kind, user.id, webpFile.name);
    const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(filePath, webpFile, {
      cacheControl: "3600",
      upsert: true
    });

    if (error) {
      setUploadError(error.message);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
    onChange(data.publicUrl);
    setIsUploading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {name ? <input name={name} readOnly type="hidden" value={value ?? ""} /> : null}
      <div className="flex flex-wrap items-center gap-3">
        <label
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-pink-100 bg-white px-4 py-2 text-sm font-medium text-pink-500 shadow-[0_10px_24px_rgba(255,214,231,0.18)]"
          htmlFor={inputId}
        >
          <UploadCloud className="size-4" />
          {isUploading ? "上传中..." : `上传${label}`}
        </label>
        <input
          accept="image/*"
          className="hidden"
          disabled={isUploading}
          id={inputId}
          onChange={handleFileChange}
          type="file"
        />
        {value ? (
          <Button onClick={() => onChange("")} type="button" variant="secondary">
            清空图片
          </Button>
        ) : null}
      </div>
      {showUrlInput ? (
        <input
          className="flex h-11 w-full rounded-[22px] border border-dashed border-pink-200 bg-white/80 px-4 py-3 text-sm text-stone-600"
          onChange={(event) => onChange(event.target.value)}
          placeholder={`输入${label}图片链接，或直接上传`}
          value={value ?? ""}
        />
      ) : null}
      {uploadError ? <p className="text-sm text-rose-500">{uploadError}</p> : null}
      {value ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/70 bg-pink-50">
          <Image alt={label} className="object-cover" fill src={value} />
        </div>
      ) : null}
    </div>
  );
}
