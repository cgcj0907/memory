import type { RecordItem, SpaceSummary } from "@/types/app";

export const mockSpace: SpaceSummary = {
  id: "space-demo",
  name: "糯米收藏夹",
  coverImagePath:
    "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cute%20pastel%20scrapbook%20cover%2C%20cream%20white%20background%2C%20soft%20pink%20and%20lavender%20paper%20textures%2C%20kawaii%20friends%20memory%20album%2C%20floating%20polaroid%20photos%2C%20dreamy%20cozy%20ui&image_size=landscape_16_9",
  pairCode: "DEMO07",
  members: [
    { id: "u1", nickname: "糯米" },
    { id: "u2", nickname: "小满" }
  ]
};

export const mockRecords: RecordItem[] = [
  {
    id: "record-1",
    title: "春天的面包店巡礼",
    categorySlug: "bakery",
    eventTime: "2026-04-09T10:30:00.000Z",
    locationText: "静安区小巷里的奶香面包房",
    description: "第一次把喜欢的可颂、吐司和奶油包都买齐了。",
    tags: ["可颂", "小店", "春天"],
    coverImagePath:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=soft%20pink%20bakery%20interior%2C%20cute%20scrapbook%20photo%2C%20friends%20bread%20trip%2C%20warm%20light%2C%20cream%20tones%2C%20cozy%20pastel%20aesthetic&image_size=portrait_4_3",
    bakeryShopName: "云朵面包房",
    bakeryItems: [
      { name: "莓莓奶油卷", tasteLevel: "legend", note: "一口就很开心" },
      { name: "盐可颂", tasteLevel: "top", note: "香香脆脆" }
    ]
  },
  {
    id: "record-2",
    title: "一起去看傍晚的江边",
    categorySlug: "place",
    eventTime: "2026-03-18T17:50:00.000Z",
    locationText: "滨江步道",
    description: "风有点大，但是天很好看，照片也很好看。",
    tags: ["散步", "晚霞"],
    coverImagePath:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=friends%20walking%20by%20river%20at%20sunset%2C%20soft%20pink%20sky%2C%20dreamy%20photo%20album%20style%2C%20cozy%20pastel%20tones&image_size=portrait_4_3"
  },
  {
    id: "record-3",
    title: "收藏到一家很好吃的餐厅",
    categorySlug: "restaurant",
    eventTime: "2026-02-02T12:30:00.000Z",
    locationText: "小小日式食堂",
    description: "吃到最后一口时就决定要记进回忆本里。",
    tags: ["午饭", "收藏"],
    coverImagePath:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cute%20restaurant%20table%20with%20dessert%20and%20meals%2C%20soft%20pink%20and%20cream%20tones%2C%20scrapbook%20photo%20style%2C%20friends%20outing&image_size=portrait_4_3"
  }
];
