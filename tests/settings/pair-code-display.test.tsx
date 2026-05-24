import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PairCodeDisplay } from "@/components/settings/pair-code-display";

describe("PairCodeDisplay", () => {
  it("renders selectable pair code", () => {
    render(<PairCodeDisplay value="DEMO07" />);

    const code = screen.getByText("DEMO07");

    expect(code).toHaveClass("select-all");
    expect(screen.getByRole("button", { name: "复制配对码" })).toBeInTheDocument();
  });
});
