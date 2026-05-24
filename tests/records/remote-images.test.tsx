import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ImageUploader } from "@/components/records/image-uploader";
import { RecordCard } from "@/components/records/record-card";
import { RecordCarousel } from "@/components/records/record-carousel";

vi.mock("embla-carousel-react", () => ({
  default: () => [vi.fn()]
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
}));

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    unoptimized
  }: {
    alt?: string;
    src: string;
    unoptimized?: boolean;
  }) => <img alt={alt} data-unoptimized={String(Boolean(unoptimized))} src={src} />
}));

describe("record remote images", () => {
  it("renders record card images without the Next optimizer", () => {
    render(
      <RecordCard
        item={{
          id: "record-1",
          title: "Cycle &Cycle",
          categorySlug: "bakery",
          eventTime: "2025-05-24T10:00:00.000Z",
          tags: [],
          bakeryShopImagePath: "https://example.com/shop.webp"
        }}
      />
    );

    expect(screen.getByAltText("Cycle &Cycle")).toHaveAttribute("data-unoptimized", "true");
  });

  it("renders carousel images without the Next optimizer", () => {
    const { container } = render(<RecordCarousel images={["https://example.com/carousel.webp"]} />);

    expect(container.querySelector('img[src="https://example.com/carousel.webp"]')).toHaveAttribute(
      "data-unoptimized",
      "true"
    );
  });

  it("renders uploader previews without the Next optimizer", () => {
    render(
      <ImageUploader
        label="店铺图片"
        onChange={() => {}}
        value="https://example.com/preview.webp"
      />
    );

    expect(screen.getByAltText("店铺图片")).toHaveAttribute("data-unoptimized", "true");
  });
});
