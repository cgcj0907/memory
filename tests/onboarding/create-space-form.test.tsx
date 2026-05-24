import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CreateSpaceForm } from "@/components/onboarding/create-space-form";

describe("CreateSpaceForm", () => {
  it("renders space cover uploader", () => {
    render(<CreateSpaceForm />);

    expect(screen.getByText("上传空间封面")).toBeInTheDocument();
  });
});
