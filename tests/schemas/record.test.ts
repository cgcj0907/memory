import { describe, expect, it } from "vitest";

import { recordSchema } from "@/lib/schemas/record";

describe("recordSchema", () => {
  it("requires title and category", () => {
    const result = recordSchema.safeParse({
      title: "",
      categorySlug: "",
      eventTime: "",
      locationText: ""
    });

    expect(result.success).toBe(false);
  });
});
