import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
};

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <Card className="bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,245,250,0.88))]">
      <CardContent className="flex flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          <Icon aria-hidden className="size-4 text-stone-400" />
          <span className="text-xs font-medium text-stone-400">{label}</span>
        </div>
        <span className="text-2xl font-semibold text-stone-700">{value}</span>
      </CardContent>
    </Card>
  );
}
