import { z } from "zod";

export const profileSchema = z.object({
  nickname: z.string().trim().min(1, "请输入昵称"),
  bio: z.string().optional().default(""),
  avatarPath: z.string().optional().default("")
});
