import React from "react";

const NamedItem = (props: {
  id: number;
  name: string;
  onItemSelect: (id: number) => void;
  onClickDelete: (id: number) => void;
}) => {
  return (
    <li className="named-item">
      <a className="named-item-name" onClick={(_event) => props.onItemSelect(props.id)}>{props.name}</a>
      <a className="delete" onClick={(_event) => props.onClickDelete(props.id)}>
        🔥
      </a>
    </li>
  );
};

export default NamedItem;
