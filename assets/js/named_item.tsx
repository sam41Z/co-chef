import React from "react";
import { Link } from "react-router-dom"

const NamedItem = (props: {
  id: number;
  name: string;
  path: string;
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
      <Link to={props.path}>
        {props.name}
      </Link>
      {deleteButton}
    </li>
  );
};

export default NamedItem;
