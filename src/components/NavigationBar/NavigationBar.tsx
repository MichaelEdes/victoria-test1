// NavigationBar.tsx
import React, { useState } from "react";
import { menuItems } from "@data/menuItems";
import "./NavigationBar.scss";
import logo from "@assets/logo.svg";

const topLinks = [
  { label: "Bathroom Planner", class: "topLink-base" },
  { label: "Ideas & Inspiration", class: "topLink-base" },
  { label: "Free Catalogue", class: "topLink-base" },
  {
    label: "Help Centre",
    class: "topLink-base dropdown",
    menuItems: [
      { label: "Track My Order", class: "link-dropdown" },
      { label: "Cancel My Order", class: "link-dropdown" },
      { label: "Amend My Order", class: "link-dropdown" },
      { label: "Return My Order", class: "link-dropdown" },
    ],
  },
  { label: "Trade Account", class: "topLink-base trade" },
];

const NavigationBar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    menuItems[0].title
  );

  const handleCategoryClick = (categoryTitle: string) => {
    setActiveCategory((prevActiveCategory) =>
      prevActiveCategory === categoryTitle ? prevActiveCategory : categoryTitle
    );
  };

  const activeCategoryData = menuItems.find(
    (category) => category.title === activeCategory
  );

  return (
    <nav className="nav-bar">
      <div className="nav-inner-container top">
        <ul className="nav-top-links">
          {topLinks.map((link, index) => (
            <li key={index} className={link.class}>
              {link.label}
              {link.menuItems && (
                <ul className="dropdown-menu">
                  {link.menuItems.map((subLink, subIndex) => (
                    <li key={subIndex} className={subLink.class}>
                      {subLink.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="nav-main">
        <object className="logo" data={logo}>
          logo
        </object>
        <div className="search">
          <i className="fa-solid fa-search"></i>
          <input type="text" placeholder="Search product name, code or brand" />
        </div>
        <div className="nav-icon">
          <i className="fa-solid fa-truck"></i>
          Track Order
        </div>
        <div className="nav-icon">
          <i className="fa-solid fa-heart"></i>
          Wish List
        </div>
        <div className="basket">
          <i className="fa-solid fa-basket-shopping"></i>
          <span>Checkout</span>
        </div>
      </div>
      <div className="nav-inner-container">
        <ul className="nav-menu">
          {menuItems.map((category, index) => (
            <li
              key={index}
              className={`category ${
                activeCategory === category.title ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category.title)}
            >
              <strong>
                <span>{category.title}</span>{" "}
                <i className="fa-solid fa-chevron-right"></i>
              </strong>
            </li>
          ))}
        </ul>
      </div>

      {activeCategoryData && (
        <div className="nav-inner-container menu">
          <ul className=" sub-category-list">
            <span className="overlay"></span>

            {activeCategoryData.subCategories.map((subCategory, subIndex) => (
              <li key={subIndex} className="sub-category">
                {subCategory.title}
                <ul className="items">
                  {subCategory.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="item">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
