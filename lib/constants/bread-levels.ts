export const BREAD_LEVEL_MAP = {
  hang: {
    label: "夯",
    className: "bg-pink-200 text-pink-700 border-pink-100"
  },
  top: {
    label: "顶级",
    className: "bg-violet-200 text-violet-700 border-violet-100"
  },
  legend: {
    label: "人上人",
    className: "bg-amber-100 text-amber-700 border-amber-50"
  },
  npc: {
    label: "NPC",
    className: "bg-sky-100 text-sky-700 border-sky-50"
  },
  bad: {
    label: "拉完了",
    className: "bg-rose-100 text-rose-700 border-rose-50"
  }
} as const;

export type BreadLevel = keyof typeof BREAD_LEVEL_MAP;
