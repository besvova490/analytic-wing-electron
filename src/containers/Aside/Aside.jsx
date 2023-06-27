import React from "react";
import { Link, useLocation } from "react-router-dom";

// components
import LogoIcon from "../../components/icons/LogoIcon";

// helpers
import { ASIDE_LINKS } from "../../helpers/router.constants";

// assets
import "../../assets/styles/containers/aside.scss";


function Aside() {
  const location = useLocation();

  return (
    <aside className="anwg-aside">
      <div className="anwg-aside__header">
        <span className="anwg-aside__header-icon">
          <LogoIcon/>
        </span>
        <h2 className="anwg-aside__header-title">
          Analytic Wing
        </h2>
      </div>
      <ul className="anwg-aside__navigation">
        {
          ASIDE_LINKS.map((item, index) => (
            <li key={`${index}-${item.value}`} className={`anwg-aside__navigation-item ${item.toBottom ? "anwg-aside__navigation-item_to-bottom" : ""}`}>
              <Link to={item.value} className={`anwg-aside__navigation-item-link ${location.pathname === item.value ? "anwg-aside__navigation-item-link_active" : ""}`}>
                <span className="anwg-aside__navigation-item-icon">{ item.icon }</span>
                {item.label}
              </Link>
            </li>
          ))
        }
      </ul>
    </aside>
  );
}

export default Aside;
