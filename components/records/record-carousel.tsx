"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

export function RecordCarousel({ images }: { images: string[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="overflow-hidden rounded-[30px]" ref={emblaRef}>
      <div className="flex">
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="min-w-0 flex-[0_0_100%]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-pink-50">
              <Image alt="" className="object-cover" fill src={image} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
