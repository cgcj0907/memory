"use client";

import { Plus, Trash2 } from "lucide-react";

import { BreadTasteBadge } from "@/components/bakery/bread-taste-badge";
import { ImageUploader } from "@/components/records/image-uploader";
import { Button } from "@/components/ui/button";
import type { BakeryItem } from "@/types/app";

type BakeryItemEditorListProps = {
  items: BakeryItem[];
  onChange: (items: BakeryItem[]) => void;
};

const levels = ["hang", "top", "legend", "npc", "bad"] as const;

export function BakeryItemEditorList({ items, onChange }: BakeryItemEditorListProps) {
  const updateItem = (index: number, next: Partial<BakeryItem>) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...next } : item)));
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={`${item.name}-${index}`} className="rounded-[26px] border border-pink-100 bg-white/80 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <input
              className="h-10 flex-1 rounded-[18px] border border-pink-100 bg-white px-3 text-sm"
              onChange={(event) => updateItem(index, { name: event.target.value })}
              placeholder="面包名称"
              value={item.name}
            />
            <button className="rounded-full bg-rose-50 p-2 text-rose-500" onClick={() => onChange(items.filter((_, i) => i !== index))} type="button">
              <Trash2 className="size-4" />
            </button>
          </div>
          <div className="mb-3">
            <ImageUploader
              kind="bakery-item"
              label="面包图片"
              onChange={(value) => updateItem(index, { imagePath: value })}
              value={item.imagePath ?? ""}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button key={level} onClick={() => updateItem(index, { tasteLevel: level })} type="button">
                <BreadTasteBadge level={level} />
              </button>
            ))}
          </div>
        </div>
      ))}
      <Button
        onClick={() => onChange([...items, { name: "", tasteLevel: "hang" }])}
        type="button"
        variant="secondary"
      >
        <Plus className="mr-2 size-4" />
        新增面包
      </Button>
    </div>
  );
}
