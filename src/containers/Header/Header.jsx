import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Avatar, Select } from "antd";
import get from "lodash/get";

// helpers
import { PAGES_TITLES } from "../../helpers/router.constants";
import { useGetShortWebApps } from "../../swr/webApp";
import { useUserContext } from "../../context/UserContext";

// assets
import "../../assets/styles/containers/header.scss";

function Header() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const pathKey = ["/", pathname.split("/")[1]].filter(Boolean).join("");
  const showSelect = ["/overview", "/feedback"].includes(pathKey);

  const { data, isLoading } = useGetShortWebApps();
  const { user } = useUserContext();

  // effects
  useEffect(() => {
    if (!id && showSelect) {
      const prevAppId = localStorage.getItem("selectedWebApp");

      prevAppId && navigate(`${pathKey}/${prevAppId}`);
    }
  }, [pathKey, id, showSelect]);

  // methods
  const handleSelectApp = value => {
    localStorage.setItem("selectedWebApp", value);
    navigate(`/overview/${value}`);
  };

  // render
  return (
    <header className="anwg-header">
      <div className="anwg-header__left">
        <h1 className="anwg-header__title">{ PAGES_TITLES[pathKey]?.title }</h1>
        <h2 className="anwg-header__subtitle">{ PAGES_TITLES[pathKey]?.subtitle }</h2>
      </div>
      <div className="anwg-header__right">
        { showSelect && (
          <Select
            placeholder="Select a web app"
            loading={isLoading}
            options={data?.map(item => ({ label: item.title, value: item.id }))}
            value={+id || undefined}
            onSelect={handleSelectApp}
          />
        ) }
        <Avatar size="large">
          { `${get(user, "firstName[0]", "N")}${get(user, "lastName[0]", "/A")}` }
        </Avatar>
      </div>
    </header>
  );
}

export default Header;
