import React from "react";

function Circle(props) {
  return (
    <div
      style={{ backgroundColor: props.color }}
      className={`circle ${props.color}`}
      onClick={props.click}
    >
      {`${props.id}`}
    </div>
  );
}

export default Circle;
