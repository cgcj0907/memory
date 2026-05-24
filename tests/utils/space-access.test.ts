import { describe, expect, it } from "vitest";

import { canReadSpaceContent } from "@/lib/utils/space-access";

describe("canReadSpaceContent", () => {
  it("blocks onboarding users from reading real space content", () => {
    expect(canReadSpaceContent("onboarding")).toBe(false);
  });

  it("allows home users to read real space content", () => {
    expect(canReadSpaceContent("home")).toBe(true);
  });
});
