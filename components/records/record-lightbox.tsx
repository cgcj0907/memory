"use client";

import Lightbox from "yet-another-react-lightbox";

type RecordLightboxProps = {
  open: boolean;
  images: string[];
  close: () => void;
};

export function RecordLightbox({ open, images, close }: RecordLightboxProps) {
  return <Lightbox close={close} open={open} slides={images.map((src) => ({ src }))} />;
}
