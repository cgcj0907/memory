import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { RecordForm } from "@/components/records/record-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn()
  })
}));

vi.mock("@/actions/records", () => ({
  createRecordAction: vi.fn()
}));

afterEach(() => {
  cleanup();
});

describe("RecordForm", () => {
  it("hides the generic cover uploader for bakery records", () => {
    render(<RecordForm defaultValues={{ categorySlug: "bakery" }} />);

    expect(screen.queryByText("上传记录封面")).not.toBeInTheDocument();
    expect(screen.getByText("上传店铺封面")).toBeInTheDocument();
  });

  it("shows the generic cover uploader for non-bakery records", () => {
    render(<RecordForm defaultValues={{ categorySlug: "moment" }} />);

    expect(screen.getAllByText("上传记录封面")).toHaveLength(1);
    expect(screen.queryByText("上传店铺封面")).not.toBeInTheDocument();
  });
});
