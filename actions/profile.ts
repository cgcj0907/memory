"use server";

import { revalidatePath } from "next/cache";

import { profileSchema } from "@/lib/schemas/profile";
import { passwordSchema } from "@/lib/schemas/settings";
import { createClient } from "@/lib/supabase/server";

export async function updateProfileAction(
  _previousState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const parsed = profileSchema.safeParse({
    nickname: formData.get("nickname"),
    bio: formData.get("bio"),
    avatarPath: formData.get("avatarPath")
  });

  if (!parsed.success) {
    return { error: "请把昵称先填好" };
  }

  const supabase = await createClient();

  if (!supabase) {
    return { success: true };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "请先登录" };
  }

  const { error } = await supabase
    .from("users_profile")
    .update({
      nickname: parsed.data.nickname,
      bio: parsed.data.bio,
      avatar_path: parsed.data.avatarPath
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath("/settings");

  return { success: true };
}

export async function updatePasswordAction(
  _previousState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const parsed = passwordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors.confirmPassword?.[0] ?? "请检查密码" };
  }

  const supabase = await createClient();

  if (!supabase) {
    return { success: true };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/settings");

  return { success: true };
}
