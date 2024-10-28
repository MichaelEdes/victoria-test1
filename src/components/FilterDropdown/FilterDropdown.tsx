import React, { useState, useEffect } from "react";
import "./FilterDropdown.scss";

export interface FilterOption {
  label: string;
  value: string | number | { gte?: number; lte?: number };
  count: number;
}

export interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedOptions: Array<string | number | { gte?: number; lte?: number }>;
  onSelect: (selectedOption: FilterOption) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedOptions,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selected, setSelected] = useState<Set<any>>(new Set(selectedOptions));

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleShowMoreToggle = () => setShowMore(!showMore);

  useEffect(() => {
    // Sync selected state with external selectedOptions prop changes (e.g., on clearAllFilters)
    setSelected(new Set(selectedOptions));
  }, [selectedOptions]);

  const handleOptionClick = (option: FilterOption) => {
    const updatedSelections = new Set(selected);

    if (updatedSelections.has(option.value)) {
      updatedSelections.delete(option.value);
    } else {
      updatedSelections.add(option.value);
    }

    setSelected(updatedSelections);
    onSelect(option);
  };

  return (
    <div className="filter-dropdown">
      <div className="filter-trigger" onClick={toggleDropdown}>
        <span>{label}</span>
        <i
          className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
        ></i>
      </div>

      {isOpen && (
        <div className="options">
          {(showMore ? options : options.slice(0, 5)).map((option, index) => (
            <div
              key={index}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              <input
                type="checkbox"
                checked={selected.has(option.value)}
                readOnly
              />
              <span className="label">{option.label}</span>
              <span className="count">({option.count})</span>
            </div>
          ))}

          {options.length > 5 && (
            <button onClick={handleShowMoreToggle} className="show-more">
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
