import { z } from "zod";

export const bakeryItemSchema = z.object({
  name: z.string().min(1, "请输入面包名称"),
  imagePath: z.string().optional().default(""),
  tasteLevel: z.enum(["hang", "top", "legend", "npc", "bad"]),
  note: z.string().optional().default("")
});

export const recordSchema = z.object({
  title: z.string().trim().min(1, "请输入标题"),
  categorySlug: z.enum(["bakery", "restaurant", "place", "moment"]),
  categoryId: z.string().optional().default(""),
  eventTime: z.string().min(1, "请选择时间"),
  locationText: z.string().optional().default(""),
  description: z.string().optional().default(""),
  tags: z.array(z.string()).optional().default([]),
  coverImagePath: z.string().optional().default(""),
  bakeryShopName: z.string().optional().default(""),
  bakeryShopImagePath: z.string().optional().default(""),
  bakeryItems: z.array(bakeryItemSchema).optional().default([])
});

export type RecordFormValues = z.infer<typeof recordSchema>;
