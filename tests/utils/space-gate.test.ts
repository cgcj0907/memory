import { describe, expect, it } from "vitest";

import { getSpaceGateState } from "@/lib/utils/space-gate";

describe("getSpaceGateState", () => {
  it("returns onboarding for signed-in users without a space", () => {
    expect(getSpaceGateState({ hasMembership: false, hasSupabase: true, hasUser: true })).toBe("onboarding");
  });

  it("returns home for signed-in users with a space", () => {
    expect(getSpaceGateState({ hasMembership: true, hasSupabase: true, hasUser: true })).toBe("home");
  });
});
