import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatCard } from "@/components/home/stat-card";

function FakeIcon() {
  return <svg aria-label="fake icon" />;
}

describe("StatCard", () => {
  it("renders the icon next to the label", () => {
    const { container } = render(<StatCard icon={FakeIcon} label="餐厅" value={2} />);

    expect(screen.getByText("餐厅")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
