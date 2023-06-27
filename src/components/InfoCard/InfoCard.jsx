import React from "react";
import PropTypes from "prop-types";

// helpers
import { getChildrenByDisplayName, getOtherChildren } from "../../helpers/subComponentsUtils";

// assets
import "../../assets/styles/components/info-card.scss";


const InfoCardControls = ({ children }) => children;
InfoCardControls.displayName = "InfoCardControls";

function InfoCard({ children, title, subTitle }) {
  const controls = getChildrenByDisplayName(children, "InfoCardControls");
  const otherChildren = getOtherChildren(children, [InfoCardControls.displayName]);

  return (
    <div className="anwg-info-card">
      <div className="anwg-info-card__header">
        <div className="anwg-info-card__header-main">
          {
            subTitle && (
              <span className="anwg-info-card__header__sub-title">
                { subTitle }
              </span>
            )
          }
          <p className="anwg-info-card__header__title">
            { title }
          </p>
        </div>
        { controls }
      </div>
      <div className="anwg-info-card__body">
        { otherChildren }
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default InfoCard;
