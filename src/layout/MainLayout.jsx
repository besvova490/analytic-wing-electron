import React from "react";
import PropTypes from "prop-types";

// components
import Aside from "../containers/Aside";
import Header from "../containers/Header";

// assets
import "../assets/styles/layouts/main-layout.scss";


function MainLayout({ children }) {

  return (
    <div className="anwg-main-layout">
      <Aside/>
      <div className="anwg-main-layout__body">
        <Header/>
        <main className="anwg-main-layout__page-content">
          {children}
        </main>
      </div>
    </div>
  );
}

MainLayout.propTypes = { children: PropTypes.node, };

export default MainLayout;
