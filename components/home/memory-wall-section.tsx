import { RecordCard } from "@/components/records/record-card";
import type { RecordItem } from "@/types/app";

export function MemoryWallSection({ items }: { items: RecordItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <RecordCard key={item.id} item={item} />
      ))}
    </div>
  );
}
