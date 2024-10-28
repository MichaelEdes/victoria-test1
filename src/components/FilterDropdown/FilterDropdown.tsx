import React, { useState } from "react";
import "./FilterDropdown.scss";

export interface FilterOption {
  label: string;
  value: string | number | { gte?: number; lte?: number };
  count: number;
}

export interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  onSelect: (selectedOption: FilterOption) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleShowMoreToggle = () => setShowMore(!showMore);

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
              onClick={() => {
                if (onSelect) onSelect(option);
              }}
            >
              <span>{option.label}</span>
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
