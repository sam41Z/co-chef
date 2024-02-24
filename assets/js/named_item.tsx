import React from "react";

const NamedItem = (props: {
  id: number;
  name: string;
  onClickDelete: (id: number) => void;
}) => {
  return (
    <div>
      {props.name}
      <span> - </span>
      <input
        type="button"
        onClick={(_event) => props.onClickDelete(props.id)}
        value="🔥🔥🔥"
        style={{ paddingLeft: 1 + "em", paddingRight: 1 + "em" }}
      />
    </div>
  );
};

export default NamedItem;
