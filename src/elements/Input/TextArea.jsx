import React from "react";
import PropTypes from "prop-types";
import { Input as AntdInput } from "antd";

// elements
import ErrorLabelProvider from "../ErrorLabelProvider";

// assets
import "../../assets/styles/elements/input.scss";


function TextArea({ label, error, ...rest }) {

  return (
    <ErrorLabelProvider label={label} error={error}>
      <AntdInput.TextArea { ...rest } className="anwg-input"/>
    </ErrorLabelProvider>
  );
}

TextArea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};

export default TextArea;
