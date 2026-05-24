"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { recordSchema } from "@/lib/schemas/record";
import { createClient } from "@/lib/supabase/server";

export async function createRecordAction(values: unknown) {
  const parsed = recordSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "请把这条回忆先填完整一点" };
  }

  const supabase = await createClient();

  if (!supabase) {
    revalidatePath("/");
    return { success: true };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: membership } = await supabase
    .from("space_members")
    .select("space_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) {
    return { error: "请先加入一个共同空间" };
  }

  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", parsed.data.categorySlug)
    .maybeSingle();

  const { data: record, error } = await supabase
    .from("records")
    .insert({
      space_id: membership.space_id,
      category_id: parsed.data.categoryId || category?.id,
      title: parsed.data.title,
      event_time: parsed.data.eventTime,
      location_text: parsed.data.locationText,
      description: parsed.data.description,
      tags: parsed.data.tags,
      cover_image_path: parsed.data.coverImagePath,
      created_by: user.id,
      updated_by: user.id
    })
    .select("id")
    .single();

  if (error || !record) {
    return { error: error?.message ?? "保存失败" };
  }

  if (parsed.data.categorySlug === "bakery" && parsed.data.bakeryShopName) {
    await supabase.from("bakery_records").upsert({
      record_id: record.id,
      shop_name: parsed.data.bakeryShopName,
      shop_image_path: parsed.data.bakeryShopImagePath
    });

    if (parsed.data.bakeryItems.length > 0) {
      await supabase.from("bakery_items").insert(
        parsed.data.bakeryItems.map((item, index) => ({
          bakery_record_id: record.id,
          name: item.name,
          image_path: item.imagePath,
          taste_level: item.tasteLevel,
          note: item.note,
          sort_order: index
        }))
      );
    }
  }

  revalidatePath("/");
  revalidatePath("/categories");
  redirect(`/records/${record.id}`);
}
