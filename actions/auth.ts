"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { SIGNUP_INVITE_CODE } from "@/lib/constants/app";
import { registerSchema } from "@/lib/schemas/auth";
import { createClient } from "@/lib/supabase/server";

export async function loginAction(formData: FormData) {
  const supabase = await createClient();

  if (!supabase) {
    redirect("/");
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    inviteCode: formData.get("inviteCode")
  });

  if (!parsed.success) {
    redirect("/register");
  }

  if (parsed.data.inviteCode !== SIGNUP_INVITE_CODE) {
    redirect("/register");
  }

  const supabase = await createClient();

  if (!supabase) {
    redirect("/onboarding");
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password
  });

  if (error) {
    redirect("/register");
  }

  if (data.user) {
    await supabase.from("users_profile").upsert({
      id: data.user.id,
      email: parsed.data.email
    });
  }

  revalidatePath("/", "layout");
  redirect("/onboarding");
}

export async function signOutAction() {
  const supabase = await createClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
