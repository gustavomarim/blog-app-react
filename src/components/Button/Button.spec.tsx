import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from ".";

describe("<Button>", () => {
  it("should render Button", () => {
    const { getByRole, getByText } = render(<Button>button</Button>);

    const buttonElement = getByRole("button");
    const buttonText = getByText("button") as HTMLElement;

    expect(buttonElement).toBeTruthy();
    expect(buttonText).toBeTruthy();
  });
});
