"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, PlusCircle, ScrollText, Settings, UserCircle2 } from "lucide-react";

import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/", label: "首页", icon: House },
  { href: "/categories", label: "分类", icon: ScrollText },
  { href: "/records/new", label: "新增", icon: PlusCircle },
  { href: "/profile", label: "我的", icon: UserCircle2 },
  { href: "/settings", label: "设置", icon: Settings }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[min(92vw,520px)] items-center justify-between rounded-full border border-white/70 bg-white/90 px-4 py-3 shadow-[0_18px_44px_rgba(255,182,193,0.26)] backdrop-blur-sm md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            className={cn(
              "flex flex-col items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium",
              active ? "text-pink-500" : "text-stone-400"
            )}
            href={item.href}
          >
            <Icon className="size-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
