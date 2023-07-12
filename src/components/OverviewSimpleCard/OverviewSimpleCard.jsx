import React from "react";
import PropTypes from "prop-types";
import { AiOutlineFundView } from "react-icons/ai";
import { PiCursorClickBold } from "react-icons/pi";
import { FaDesktop, FaMobileAlt } from "react-icons/fa";

// helpers
import formatNumber from "../../helpers/formatNumber";

// assets
import "../../assets/styles/components/overview-simple-card.scss";


const mapCardIcon = (key) => {
  switch (key) {
    case "Views":
      return (
        <span className="anwg-overview-simple-card__icon anwg-overview-simple-card__icon_yellow">
          <AiOutlineFundView/>
        </span>
      );
    case "Clicks":
      return (
        <span className="anwg-overview-simple-card__icon anwg-overview-simple-card__icon_blue">
          <PiCursorClickBold/>
        </span>
      );
    case "Desktop":
      return (
        <span className="anwg-overview-simple-card__icon anwg-overview-simple-card__icon_pink">
          <FaDesktop/>
        </span>
      );
    case "Mobile":
      return (
        <span className="anwg-overview-simple-card__icon anwg-overview-simple-card__icon_sky">
          <FaMobileAlt/>
        </span>
      );
    default:
      return null;
  }
};

function OverviewSimpleCard({ label, value, percentage }) {

  return (
    <div className="anwg-overview-simple-card">
      { mapCardIcon(label) }
      <div className="anwg-overview-simple-card__info">
        <span className="anwg-overview-simple-card__info__label">{ label }</span>
        <p className="anwg-overview-simple-card__info__values">
          <span className="anwg-overview-simple-card__info__value">
            { value ? formatNumber(value) : "N/A" }
          </span>
          {
            percentage && (
              <span className={`anwg-percentage ${percentage > 0 ? "anwg-percentage_positive" : ""}`}>
                { `${percentage > 0 ? "+" : ""}${formatNumber(percentage)}` }%
              </span>
            )
          }
        </p>
      </div>
    </div>
  );
}

OverviewSimpleCard.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  percentage: PropTypes.number,
};

export default OverviewSimpleCard;
