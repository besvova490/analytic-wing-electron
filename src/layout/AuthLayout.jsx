import React from "react";
import PropTypes from "prop-types";

// assets
import signUpImage from "../assets/images/sign-up-image.jpg";
import "../assets/styles/layouts/auth-layout.scss";


function AuthLayout({ children }) {

  return (
    <div className="anwg-auth-layout">
      <div className="anwg-auth-layout__banner">
        <img src={signUpImage} className="anwg-auth-layout__banner-image"/>
      </div>
      <div className="anwg-auth-layout__page-content">
        { children }
      </div>
    </div>
  );
}

AuthLayout.propTypes = { children: PropTypes.node, };

export default AuthLayout;
