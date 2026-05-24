import { describe, expect, it, vi } from "vitest";

import { buildStoragePath } from "@/lib/utils/storage";

describe("buildStoragePath", () => {
  it("builds a stable path with kind, user and random uuid filename", () => {
    vi.spyOn(crypto, "randomUUID").mockReturnValue("uuid-1234");

    expect(buildStoragePath("record", "user-1", "photo.webp")).toBe("record/user-1/uuid-1234.webp");
  });
});
