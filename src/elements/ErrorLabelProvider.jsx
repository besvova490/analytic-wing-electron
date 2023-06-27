import React from "react";
import PropTypes from "prop-types";

// assets
import "../assets/styles/elements/error-label-provider.scss";


function ErrorLabelProvider({ label, error, children }) {

  return (
    <div className="anwg-error-label-provider">
      { label && <span className="anwg-error-label-provider__label">{label}</span> }
      { children }
      { error && <span className="anwg-error-label-provider__error">{error}</span> }
    </div>
  );
}

ErrorLabelProvider.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node,
};

export default ErrorLabelProvider;
