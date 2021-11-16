import React from "react";

function Gameover(props) {
  return (
    <div className="gameover">
      <div className="gameovercontent">
        <div className="gameoverbuttonwrapper">
          <button className="close" onClick={props.close}>
            X
          </button>
        </div>
        <h2>Game Over!</h2>
        <p>Your score was: {props.score}</p>
      </div>
    </div>
  );
}

export default Gameover;
