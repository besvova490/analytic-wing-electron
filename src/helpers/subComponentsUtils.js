import React from "react";

export const getChildrenByDisplayName = (children, displayName) => {
  const filteredChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type !== "string") {

      return child.type.displayName === displayName ? child : null;
    }

    return null;
  });

  return filteredChildren && filteredChildren.length ? filteredChildren : null;
};

export const getOtherChildren = (children, displayNames) => {
  return React.Children.map(children, child => {
    if (React.isValidElement(child) && typeof child.type !== "string") {

      return displayNames.includes(child.type.displayName) ? null : child;
    }

    return child;
  });
};
