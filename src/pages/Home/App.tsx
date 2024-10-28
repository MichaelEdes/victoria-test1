import React from "react";
import Logo from "@assets/logo.svg";
import NavigationBar from "@components/NavigationBar/NavigationBar";
import "./App.scss";
import ProductListings from "@components/ProductListings/ProductListings";

function App() {
  return (
    <div className="home-layout">
      <NavigationBar></NavigationBar>
      <ProductListings></ProductListings>
    </div>
  );
}

export default App;
