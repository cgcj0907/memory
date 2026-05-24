import { describe, expect, it } from "vitest";

import { buildHomeStats } from "@/lib/utils/home-stats";
import type { RecordItem } from "@/types/app";

describe("buildHomeStats", () => {
  it("uses the requested labels and values for the home stats", () => {
    const records: RecordItem[] = [
      {
        id: "1",
        title: "一起吃饭",
        categorySlug: "restaurant",
        eventTime: "2026-05-24T10:00:00.000Z",
        tags: []
      },
      {
        id: "2",
        title: "买面包",
        categorySlug: "bakery",
        eventTime: "2026-05-23T10:00:00.000Z",
        tags: []
      },
      {
        id: "3",
        title: "公园散步",
        categorySlug: "place",
        eventTime: "2026-05-20T10:00:00.000Z",
        tags: []
      }
    ];

    expect(buildHomeStats(records).map((item) => [item.label, item.value])).toEqual([
      ["餐厅", 1],
      ["面包店", 1],
      ["去过的地方", 1],
      ["最近更新", "05.24"]
    ]);
  });
});
