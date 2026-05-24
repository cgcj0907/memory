import { z } from "zod";

export const createSpaceSchema = z.object({
  name: z.string().trim().min(1, "请输入空间名"),
  coverImagePath: z.string().optional().default("")
});

export const joinSpaceSchema = z.object({
  pairCode: z.string().trim().min(1, "请输入配对码")
});
