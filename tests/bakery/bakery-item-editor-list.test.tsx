import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BakeryItemEditorList } from "@/components/bakery/bakery-item-editor-list";

afterEach(() => {
  cleanup();
});

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

  it("lets users choose a taste level and marks the selected option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <BakeryItemEditorList
        items={[{ name: "盐可颂", imagePath: "", note: "", tasteLevel: "top" }]}
        onChange={onChange}
      />
    );

    const topButton = screen.getByRole("button", { name: "顶级" });
    const legendButton = screen.getByRole("button", { name: "人上人" });

    expect(topButton).toHaveAttribute("aria-pressed", "true");
    expect(legendButton).toHaveAttribute("aria-pressed", "false");

    await user.click(legendButton);

    expect(onChange).toHaveBeenCalledWith([{ name: "盐可颂", imagePath: "", note: "", tasteLevel: "legend" }]);
  });
});
