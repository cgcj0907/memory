import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BakeryItemEditorList } from "@/components/bakery/bakery-item-editor-list";

describe("BakeryItemEditorList", () => {
  it("renders image uploader for bakery item", () => {
    render(
      <BakeryItemEditorList
        items={[{ name: "盐可颂", imagePath: "", note: "", tasteLevel: "top" }]}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("上传面包图片")).toBeInTheDocument();
  });
});
