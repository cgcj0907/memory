"use client";

import { motion } from "framer-motion";

type SpaceHeroProps = {
  spaceName: string;
  members: Array<{ id?: string; nickname?: string | null }>;
  coverUrl?: string | null;
};

export function SpaceHero({ spaceName, members, coverUrl }: SpaceHeroProps) {
  return (
    <motion.section
      className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/80 p-6 shadow-[0_24px_60px_rgba(255,182,193,0.18)]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffd8e8_0%,transparent_30%),radial-gradient(circle_at_bottom_right,#fff1b8_0%,transparent_30%)]" />
      {coverUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
      ) : null}
      <div className="relative flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-pink-500">今天也来整理一点共同回忆</span>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-700">{spaceName}</h1>
          <p className="max-w-xl text-sm leading-6 text-stone-500">
            像翻一本慢慢变厚的朋友手账，把一起走过的地方和吃过的东西都贴进来。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {members.map((member, index) => (
            <span
              key={member.id ?? `${member.nickname ?? "member"}-${index}`}
              className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-medium text-stone-600"
            >
              {member.nickname ?? `朋友 ${index + 1}`}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
