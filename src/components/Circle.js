import React from "react";

function Circle(props) {
  return (
    <div
      style={{ backgroundColor: props.color }}
      className={`circle ${props.active ? "active" : ""}`}
      onClick={props.click}
    >
      <p>{`${props.id}`}</p>
    </div>
  );
}

export default Circle;
