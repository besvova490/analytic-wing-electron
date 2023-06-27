import React from "react";
import PropTypes from "prop-types";
import { Input as AntdInput } from "antd";

// elements
import ErrorLabelProvider from "../ErrorLabelProvider";

// assets
import "../../assets/styles/elements/input.scss";


function Input({ label, error, ...rest }) {

  return (
    <ErrorLabelProvider label={label} error={error}>
      <AntdInput { ...rest } className="anwg-input"/>
    </ErrorLabelProvider>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
