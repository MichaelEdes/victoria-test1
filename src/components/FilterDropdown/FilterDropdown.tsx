// FilterDropdown.tsx
import React, { useState } from "react";
import "./FilterDropdown.scss";

// Assuming this is in FilterDropdown.tsx or a shared types file

// FilterOption should represent individual filter options
export interface FilterOption {
  label: string; // Display label for the filter
  value: string | number | { gte?: number; lte?: number }; // Actual filter value, including range support
  count: number; // Product count for this option
}

// Props for FilterDropdown component
export interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  onSelect: (selectedOption: FilterOption) => void; // Update onSelect to receive a FilterOption
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  onSelect,
  //   showMoreEnabled = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleShowMoreToggle = () => setShowMore(!showMore);

  return (
    <div className="filter-dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span>{label}</span>
        <i
          className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
        ></i>
      </div>

      {isOpen && (
        <div className="dropdown-options">
          {(showMore ? options : options.slice(0, 5)).map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
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
