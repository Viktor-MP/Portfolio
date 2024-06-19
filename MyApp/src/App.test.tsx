import React from "react";
import { render, screen } from "@testing-library/react";
import PortfolioApp from "./components/PortfolioApp/PortfolioApp";

test("renders learn react link", () => {
    render(<PortfolioApp />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
