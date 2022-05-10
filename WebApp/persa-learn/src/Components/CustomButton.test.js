import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomButton from "./CustomButton";

it("renders without crashing", () => {
  const { queryByTestId } = render(<CustomButton text={"learn react"} />);
  const btn = queryByTestId("button");
  expect(btn).toBeTruthy();
});

describe("clickButton", () => {
  it("onClick", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const { queryByTestId } = render(
      <CustomButton
        text={"learn react"}
        onClick={() => console.log("worked")}
      />
    );
    const btn = queryByTestId("button");
    fireEvent.click(btn);
    expect(consoleSpy).toHaveBeenCalledWith("worked");
  });
});
// test("renders without crashing", () => {
//   render(<CustomButton text={"learn react"} />);
//   const linkElement = screen.getByText(/learn react/i);
// });
