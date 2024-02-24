import React from "react";

const NamedItem = (props: {
  id: number;
  name: string;
  onClickDelete: (id: number) => void;
}) => {
  return (
    <li className="named-item">
      {props.name}
      <span
        className="delete"
        onClick={(_event) => props.onClickDelete(props.id)}
      >
        🔥
      </span>
    </li>
  );
};

export default NamedItem;
