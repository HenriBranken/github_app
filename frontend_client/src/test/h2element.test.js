import { render, screen } from "@testing-library/react";

import Home from "../components/pages/Home/Home";

test("<h2> tag is present", () => {
  render(<Home />);

  const element = screen.getByText(/search github user/i);

  expect(element).toBeInTheDocument();
});
