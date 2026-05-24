"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { createRecordAction } from "@/actions/records";
import { BakerySectionEditor } from "@/components/bakery/bakery-section-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_OPTIONS } from "@/lib/constants/categories";
import { recordSchema, type RecordFormValues } from "@/lib/schemas/record";
import { softToast } from "@/components/ui/soft-toast";
import { TagInput } from "@/components/records/tag-input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/records/image-uploader";

type RecordFormProps = {
  defaultValues?: Partial<RecordFormValues>;
};

const defaultFormValues: RecordFormValues = {
  title: "",
  categorySlug: "moment",
  categoryId: "",
  eventTime: "",
  locationText: "",
  description: "",
  tags: [],
  coverImagePath: "",
  bakeryShopName: "",
  bakeryShopImagePath: "",
  bakeryItems: []
};

export function RecordForm({ defaultValues }: RecordFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState("");
  const form = useForm<RecordFormValues>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      ...defaultFormValues,
      ...defaultValues
    }
  });
  const categorySlug = useWatch({ control: form.control, name: "categorySlug" });
  const bakeryShopName = useWatch({ control: form.control, name: "bakeryShopName" });
  const bakeryShopImagePath = useWatch({ control: form.control, name: "bakeryShopImagePath" });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit((values) => {
        setSubmitError("");
        startTransition(async () => {
          const result = await createRecordAction(values);

          if (result?.error) {
            setSubmitError(result.error);
            return;
          }

          softToast("这条回忆已经贴进相册里了");
          router.push("/");
          router.refresh();
        });
      })}
    >
      <Input placeholder="标题 / 名称" {...form.register("title")} />
      <div className="grid gap-4 md:grid-cols-2">
        <select
          className="h-11 rounded-[22px] border border-pink-100 bg-white/90 px-4 text-sm text-stone-700"
          {...form.register("categorySlug")}
        >
          {CATEGORY_OPTIONS.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <Input type="datetime-local" {...form.register("eventTime")} />
      </div>
      <Input placeholder="地点" {...form.register("locationText")} />
      <Textarea placeholder="写下这一天的小细节" {...form.register("description")} />
      <Controller
        control={form.control}
        name="tags"
        render={({ field }) => <TagInput onChange={field.onChange} value={field.value} />}
      />
      {categorySlug !== "bakery" ? (
        <Controller
          control={form.control}
          name="coverImagePath"
          render={({ field }) => <ImageUploader label="记录封面" onChange={field.onChange} value={field.value} />}
        />
      ) : null}

      {categorySlug === "bakery" ? (
        <Controller
          control={form.control}
          name="bakeryItems"
          render={({ field }) => (
            <BakerySectionEditor
              items={field.value}
              onItemsChange={field.onChange}
              onShopImagePathChange={(value) => form.setValue("bakeryShopImagePath", value)}
              onShopNameChange={(value) => form.setValue("bakeryShopName", value)}
              shopImagePath={bakeryShopImagePath}
              shopName={bakeryShopName}
            />
          )}
        />
      ) : null}

      {submitError ? <p className="text-sm text-rose-500">{submitError}</p> : null}

      <div>
        <Button disabled={isPending} type="submit">
          {isPending ? "保存中..." : "保存这条回忆"}
        </Button>
      </div>
    </form>
  );
}
