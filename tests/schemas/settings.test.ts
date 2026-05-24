import { describe, expect, it } from "vitest";

import { passwordSchema } from "@/lib/schemas/settings";

describe("passwordSchema", () => {
  it("accepts matching passwords", () => {
    const result = passwordSchema.safeParse({
      password: "123456",
      confirmPassword: "123456"
    });

    expect(result.success).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = passwordSchema.safeParse({
      password: "123456",
      confirmPassword: "654321"
    });

    expect(result.success).toBe(false);
  });
});
