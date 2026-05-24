import { describe, expect, it } from "vitest";

import { registerSchema } from "@/lib/schemas/auth";

describe("registerSchema", () => {
  it("accepts a valid registration payload", () => {
    const result = registerSchema.safeParse({
      email: "test@qq.com",
      password: "123456",
      confirmPassword: "123456",
      inviteCode: "0907"
    });

    expect(result.success).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({
      email: "test@qq.com",
      password: "123456",
      confirmPassword: "654321",
      inviteCode: "0907"
    });

    expect(result.success).toBe(false);
  });
});
