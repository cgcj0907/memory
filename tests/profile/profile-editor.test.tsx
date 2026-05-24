import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProfileEditor } from "@/components/profile/profile-editor";

describe("ProfileEditor", () => {
  it("renders avatar uploader", () => {
    render(<ProfileEditor avatarPath="" bio="" nickname="糯米" />);

    expect(screen.getByText("上传头像")).toBeInTheDocument();
  });
});
