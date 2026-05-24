"use client";

import { useState } from "react";

import { RecordCarousel } from "@/components/records/record-carousel";
import { RecordLightbox } from "@/components/records/record-lightbox";

export function RecordGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <button className="rounded-[30px] text-left" onClick={() => setOpen(true)} type="button">
        <RecordCarousel images={images} />
      </button>
      <RecordLightbox close={() => setOpen(false)} images={images} open={open} />
    </div>
  );
}
