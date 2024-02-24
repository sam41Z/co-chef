import React, { ReactNode } from "react";
import "./content_box.scss";

type ContentBoxProps = {
  children: {
    left: ReactNode;
    right: ReactNode;
  };
};

const ContentBox = (props: ContentBoxProps) => {
  return (
    <div className="box box-row">
      <div className="box-fade-out-top" />
      <div className="box-fade-out-bottom" />
      <div className="box-scrollable-left">{props.children.left}</div>
      <hr />
      <div className="box-scrollable-right">{props.children.right}</div>
    </div>
  );
};
export default ContentBox;
