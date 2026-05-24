import { describe, expect, it, vi } from "vitest";

import { buildStoragePath } from "@/lib/utils/storage";

describe("buildStoragePath", () => {
  it("builds a stable path with kind, user and filename", () => {
    vi.spyOn(Date, "now").mockReturnValue(1700000000000);

    expect(buildStoragePath("record", "user-1", "photo.png")).toBe("record/user-1/1700000000000-photo.png");
  });
});
