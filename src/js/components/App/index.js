"use strict";

import React from "react";
import Header from "../Header/";
import Footer from "../Footer/";

// The application wrapper component
export default function App(props) {
  return (
    <div className="wrapper">
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  );
}