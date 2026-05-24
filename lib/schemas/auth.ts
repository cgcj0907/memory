import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("请输入正确的邮箱地址"),
    password: z.string().min(6, "密码至少 6 位"),
    confirmPassword: z.string().min(6, "请再次输入密码"),
    inviteCode: z.string().trim().min(1, "请输入邀请码")
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "两次输入的密码不一致"
  });
