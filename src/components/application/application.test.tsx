import { render, screen } from '@testing-library/react';
import Application from './application';

describe("UT-Application", () => {
  test("Render correctly", () => {
    render(<Application />);

    const nameEl = screen.getByRole("textbox");
    expect(nameEl).toBeInTheDocument();

    const jobLocation = screen.getByRole('combobox');
    expect(jobLocation).toBeInTheDocument();

    const termAndCondition = screen.getByRole('checkbox');
    expect(termAndCondition).toBeInTheDocument()

    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  })
});