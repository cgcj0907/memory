import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BreadTasteBadge } from "@/components/bakery/bread-taste-badge";

describe("BreadTasteBadge", () => {
  it("renders bread level label", () => {
    render(<BreadTasteBadge level="legend" />);

    expect(screen.getByText("人上人")).toBeInTheDocument();
  });
});
