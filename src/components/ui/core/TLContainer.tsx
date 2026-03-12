import React from "react";

interface ITLContainerPrpos {
  children: React.ReactNode;
  className?: string;
}

const TLContainer = ({ children, className = "" }: ITLContainerPrpos) => {
  return <div className={`mx-auto container ${className}`}>{children}</div>;
};

export default TLContainer;
