import React from "react";

function Circle(props) {
  return (
    <div
      style={{ backgroundColor: props.color }}
      className={`circle ${props.color}`}
    >
      {`${props.id}`}
    </div>
  );
}

export default Circle;
