import React, { ReactNode } from "react";

type ContentBoxProps = {
  children: {
    left: ReactNode;
    right: ReactNode;
  };
};

const ContentBox = (props: ContentBoxProps) => {
  return (
    <div className="box box-row">
      <div className="fade-out-top" />
      <div className="fade-out-bottom" />
      <div className="scrollable-left">{props.children.left}</div>
      <hr />
      <div className="scrollable-right">{props.children.right}</div>
    </div>
  );
};
export default ContentBox;
