import { describe, expect, it } from "vitest";

import { BREAD_LEVEL_MAP } from "@/lib/constants/bread-levels";

describe("BREAD_LEVEL_MAP", () => {
  it("maps all taste levels to labels", () => {
    expect(BREAD_LEVEL_MAP.hang.label).toBe("夯");
    expect(BREAD_LEVEL_MAP.top.label).toBe("顶级");
    expect(BREAD_LEVEL_MAP.legend.label).toBe("人上人");
    expect(BREAD_LEVEL_MAP.npc.label).toBe("NPC");
    expect(BREAD_LEVEL_MAP.bad.label).toBe("拉完了");
  });
});
