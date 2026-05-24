import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SpaceHero } from "@/components/home/space-hero";

describe("SpaceHero", () => {
  it("renders the space name", () => {
    render(<SpaceHero members={[]} spaceName="糯米小屋" />);

    expect(screen.getByText("糯米小屋")).toBeInTheDocument();
  });
});
