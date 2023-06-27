import React from "react";
import { useLocation } from "react-router-dom";
import { Avatar } from "antd";

// helpers
import { PAGES_TITLES } from "../../helpers/router.constants";

// assets
import "../../assets/styles/containers/header.scss";

function Header() {
  const { pathname } = useLocation();

  return (
    <header className="anwg-header">
      <div className="anwg-header__left">
        <h1 className="anwg-header__title">{ PAGES_TITLES[pathname].title }</h1>
        <h2 className="anwg-header__subtitle">{ PAGES_TITLES[pathname].subtitle }</h2>
      </div>
      <div className="anwg-header__right">
        <Avatar size="large">HR</Avatar>
      </div>
    </header>
  );
}

export default Header;
