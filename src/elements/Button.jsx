import React from "react";
import PropTypes from "prop-types";
import { Button as AntdButton } from "antd";
import classNames from "classnames";

// assets
import "../assets/styles/elements/button.scss";


function Button({ type = "primary", ...props }) {
  const className = classNames(`anwg-button anwg-button_${type}`);

  return (
    <AntdButton { ...props } className={className}/>
  );
}

Button.propTypes = { type: PropTypes.string, };

export default Button;
