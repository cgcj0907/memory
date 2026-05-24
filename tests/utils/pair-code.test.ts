import { describe, expect, it } from "vitest";

import { createPairCode } from "@/lib/utils/pair-code";

describe("createPairCode", () => {
  it("returns uppercase code with length 6", () => {
    const code = createPairCode();

    expect(code).toMatch(/^[A-Z0-9]{6}$/);
  });
});
