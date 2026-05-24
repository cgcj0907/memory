"use client";

import { BakeryItemEditorList } from "@/components/bakery/bakery-item-editor-list";
import { ImageUploader } from "@/components/records/image-uploader";
import { Input } from "@/components/ui/input";
import type { BakeryItem } from "@/types/app";

type BakerySectionEditorProps = {
  shopName: string;
  shopImagePath?: string;
  items: BakeryItem[];
  onShopNameChange: (value: string) => void;
  onShopImagePathChange: (value: string) => void;
  onItemsChange: (items: BakeryItem[]) => void;
};

export function BakerySectionEditor({
  shopName,
  shopImagePath,
  items,
  onShopNameChange,
  onShopImagePathChange,
  onItemsChange
}: BakerySectionEditorProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] bg-pink-50/60 p-4">
      <Input onChange={(event) => onShopNameChange(event.target.value)} placeholder="店名" value={shopName} />
      <ImageUploader kind="bakery-shop" label="店铺封面" onChange={onShopImagePathChange} value={shopImagePath} />
      <BakeryItemEditorList items={items} onChange={onItemsChange} />
    </div>
  );
}
