import { formatDisplayDate } from "@/lib/utils/date";
import type { RecordItem } from "@/types/app";

export function TimelineList({ items }: { items: RecordItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="size-3 rounded-full bg-pink-400" />
            <span className="mt-2 h-full w-px bg-pink-100" />
          </div>
          <div className="flex flex-col gap-1 pb-4">
            <span className="text-xs font-medium text-stone-400">{formatDisplayDate(item.eventTime)}</span>
            <span className="text-sm font-semibold text-stone-700">{item.title}</span>
            <span className="text-sm text-stone-500">{item.locationText || "把这天的细节也记下来"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
