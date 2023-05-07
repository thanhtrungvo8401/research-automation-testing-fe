import React, { useState } from 'react';

function Dropdown({ options, onSelect }: any) {
  const [selectedOption, setSelectedOption] = useState<null | { value: string, label: string }>(null);
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(option: any) {
    setSelectedOption(option);
    onSelect?.(option);
    setIsOpen(false);
  }

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="dropdown-container">
      <input type='button' value={selectedOption?.label || 'Select an option'} onClick={toggleMenu} />

      {isOpen && (
        <ul className="dropdown-menu" style={{ listStyleType: 'none', margin: 0, padding: 0  }} >
          {options.map((option: any) => (
            <li key={option.value} onClick={() => handleSelect(option)} style={{ background: 'rgba(0,0,0,0.1)', padding: '0.2rem', margin: '2px 0' }}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
