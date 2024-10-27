import React from "react";
import Logo from "@assets/logo.svg";
import NavigationBar from "@components/NavigationBar/NavigationBar";
import "./App.scss";

function App() {
  return (
    <div className="home-layout">
      <NavigationBar></NavigationBar>
      <header className="App-header">
        <div>
          <span>Bathroom planner</span>
          <span>Ideas and inspiration</span>
        </div>
        <div>
          <div>Logo</div>
          <div>Search BAR</div>
          <div>track order</div>
          <div>WishList</div>
          <div>Basket Checkout</div>
        </div>
      </header>
      <div className="home-main-content">hello</div>
    </div>
  );
}

export default App;
