import { describe, expect, it, vi } from "vitest";

import { convertImageFileToWebp, toWebpFileName } from "@/lib/utils/webp-upload";

describe("toWebpFileName", () => {
  it("replaces original extension with webp", () => {
    expect(toWebpFileName("cover.png")).toBe("cover.webp");
  });
});

describe("convertImageFileToWebp", () => {
  it("returns original file when already webp", async () => {
    const file = new File(["data"], "cover.webp", { type: "image/webp" });

    await expect(convertImageFileToWebp(file)).resolves.toBe(file);
  });

  it("converts image file to webp", async () => {
    const originalFile = new File(["png"], "cover.png", { type: "image/png" });
    const originalCreateObjectUrl = URL.createObjectURL;
    const originalRevokeObjectUrl = URL.revokeObjectURL;
    const OriginalImage = globalThis.Image;
    const originalCreateElement = document.createElement.bind(document);
    const drawImage = vi.fn();
    const toBlob = vi.fn((callback: BlobCallback) => callback(new Blob(["webp"], { type: "image/webp" })));

    // @ts-expect-error test shim
    URL.createObjectURL = vi.fn(() => "blob:test");
    // @ts-expect-error test shim
    URL.revokeObjectURL = vi.fn();

    class MockImage {
      width = 100;
      height = 80;
      onload: null | (() => void) = null;
      onerror: null | (() => void) = null;

      set src(_value: string) {
        this.onload?.();
      }
    }

    // @ts-expect-error test shim
    globalThis.Image = MockImage;
    vi.spyOn(document, "createElement").mockImplementation(((tagName: string) => {
      if (tagName === "canvas") {
        return {
          width: 0,
          height: 0,
          getContext: () => ({ drawImage }),
          toBlob
        } as unknown as HTMLCanvasElement;
      }

      return originalCreateElement(tagName);
    }) as typeof document.createElement);

    const converted = await convertImageFileToWebp(originalFile);

    expect(converted.type).toBe("image/webp");
    expect(converted.name).toBe("cover.webp");
    expect(drawImage).toHaveBeenCalled();

    document.createElement = originalCreateElement;
    URL.createObjectURL = originalCreateObjectUrl;
    URL.revokeObjectURL = originalRevokeObjectUrl;
    globalThis.Image = OriginalImage;
  });
});
