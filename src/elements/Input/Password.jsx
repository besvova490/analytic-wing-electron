import React from "react";
import PropTypes from "prop-types";
import { Input as AntdInput } from "antd";

// elements
import ErrorLabelProvider from "../ErrorLabelProvider";

// assets
import "../../assets/styles/elements/input.scss";


function Password({ label, error, ...rest }) {

  return (
    <ErrorLabelProvider label={label} error={error}>
      <AntdInput.Password { ...rest } className="anwg-input"/>
    </ErrorLabelProvider>
  );
}

Password.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};

export default Password;
