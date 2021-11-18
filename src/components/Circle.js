import React from "react";

function Circle(props) {
  return (
    <div
      style={{
        backgroundColor: props.color,
        pointerEvents: props.disabled ? "auto" : "none",
      }}
      className={`circle ${props.active ? "active" : ""}`}
      onClick={props.click}
    ></div>
  );
}

export default Circle;
