import {
  CalendarDays,
  Croissant,
  MapPin,
  UtensilsCrossed,
  type LucideIcon
} from "lucide-react";

import type { RecordItem } from "@/types/app";

export type HomeStat = {
  label: string;
  value: string | number;
  icon: LucideIcon;
};

export function buildHomeStats(records: RecordItem[]): HomeStat[] {
  return [
    {
      label: "餐厅",
      value: records.filter((item) => item.categorySlug === "restaurant").length,
      icon: UtensilsCrossed
    },
    {
      label: "面包店",
      value: records.filter((item) => item.categorySlug === "bakery").length,
      icon: Croissant
    },
    {
      label: "去过的地方",
      value: records.filter((item) => item.categorySlug === "place").length,
      icon: MapPin
    },
    {
      label: "最近更新",
      value: records[0]?.eventTime?.slice(5, 10).replace("-", ".") ?? "还没有",
      icon: CalendarDays
    }
  ];
}
