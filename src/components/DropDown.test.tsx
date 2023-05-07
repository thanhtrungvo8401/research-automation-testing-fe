import { render, screen } from '@testing-library/react';
import Dropdown from './DropDown';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe("UT-Dropdown" , () => {
  const options = [
    { label: 'label - 1', value: 'v1' },
    { label: 'label - 2', value: 'v2' },
    { label: 'label - 3', value: 'v3' }
  ]
  test("Should dropdown display correctly", async() => {
    render(<Dropdown options={options} />);

    const dropdownBtn = screen.getByRole('button', {
      name: /select an option/i
    });
    expect(dropdownBtn).toBeInTheDocument();

    userEvent.click(dropdownBtn);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(options.length)
  });

  test("Should dropdown work as expected", () => {
    const onSelectHandler = jest.fn();

    render(<Dropdown options={options} onSelect={onSelectHandler} />);
    
    let dropdownBtn = screen.getByRole('button', {
      name: /select an option/i
    });
    userEvent.click(dropdownBtn);

    const selectedItem = options[1];
    const item2nd = screen.getAllByRole("listitem")[1];
    userEvent.click(item2nd);

    dropdownBtn =  screen.getByRole('button', {
      name: `${selectedItem.label}`
    });
    const list = screen.queryByRole('list');
    expect(dropdownBtn).toBeInTheDocument();
    expect(list).not.toBeInTheDocument();
    expect(onSelectHandler).toBeCalledWith(selectedItem)
  })

})