"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { mockSpace } from "@/lib/constants/mock-data";
import { createSpaceSchema, joinSpaceSchema } from "@/lib/schemas/space";
import { createClient } from "@/lib/supabase/server";
import { createPairCode } from "@/lib/utils/pair-code";

export async function createSpaceAction(formData: FormData) {
  const parsed = createSpaceSchema.safeParse({
    name: formData.get("name"),
    coverImagePath: formData.get("coverImagePath")
  });

  if (!parsed.success) {
    redirect("/onboarding");
  }

  const supabase = await createClient();

  if (!supabase) {
    revalidatePath("/");
    redirect("/");
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const pairCode = createPairCode();
  const { data, error } = await supabase
    .from("spaces")
    .insert({
      name: parsed.data.name,
      cover_image_path: parsed.data.coverImagePath || mockSpace.coverImagePath,
      pair_code: pairCode,
      owner_user_id: user.id
    })
    .select("id")
    .single();

  if (error || !data) {
    redirect("/onboarding");
  }

  await supabase.from("space_members").insert({ space_id: data.id, user_id: user.id, role: "owner" });

  revalidatePath("/");
  redirect("/");
}

export async function joinSpaceAction(formData: FormData) {
  const parsed = joinSpaceSchema.safeParse({
    pairCode: formData.get("pairCode")
  });

  if (!parsed.success) {
    redirect("/onboarding");
  }

  const supabase = await createClient();

  if (!supabase) {
    redirect("/");
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: space, error } = await supabase
    .from("spaces")
    .select("id")
    .eq("pair_code", parsed.data.pairCode.toUpperCase())
    .single();

  if (error || !space) {
    redirect("/onboarding");
  }

  await supabase.from("space_members").upsert({ space_id: space.id, user_id: user.id, role: "member" });

  revalidatePath("/");
  redirect("/");
}
