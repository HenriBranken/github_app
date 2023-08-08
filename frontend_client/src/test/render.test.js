import { render, screen, cleanup } from "@testing-library/react";
import Home from "../components/pages/Home/Home";

afterEach(() => {
  cleanup();
});

test("Should Render the Search Form", () => {
  render(<Home />);
  const searchElement = screen.getByTestId("search-form");
  expect(searchElement).toHaveTextContent("Search");
});
