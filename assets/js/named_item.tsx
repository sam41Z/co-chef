import React from "react";

const NamedItem = (props: {
  id: number;
  name: string;
  onItemSelect: (id: number) => void;
  onClickDelete: (id: number) => void;
  showDelete?: boolean;
}) => {
  const showDelete = (showDelete: boolean = true) => showDelete;
  const deleteButton = showDelete(props.showDelete) && (
    <a className="delete" onClick={(_event) => props.onClickDelete(props.id)}>
      🔥
    </a>
  );
  return (
    <li className="named-item">
      <a
        className="named-item-name"
        onClick={(_event) => props.onItemSelect(props.id)}
      >
        {props.name}
      </a>
      {deleteButton}
    </li>
  );
};

export default NamedItem;
