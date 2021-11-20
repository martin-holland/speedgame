import React from "react";

function Gameover(props) {
  let scoreMessage = "";
  if (props.score === 0) {
    scoreMessage = "Click the plants to make sure they are watered!";
  } else if (props.score >= 50 && props.score < 100) {
    scoreMessage = "Were you really trying?";
  } else if (props.score >= 100 && props.score < 150) {
    scoreMessage = "Wow! but you can do better!";
  } else if (props.score >= 150 && props.score < 200) {
    scoreMessage = "Amazing! High score for sure!";
  } else if (props.score >= 200) {
    scoreMessage = "Are you cheating?...";
  }
  return (
    <div className="gameover">
      <div className="gameovercontent">
        <div className="gameoverbuttonwrapper">
          <button className="close" onClick={props.close}>
            X
          </button>
        </div>
        <h2>Game Over!</h2>
        <h3>Your score was: {props.score}</h3>
        <h3>{scoreMessage}</h3>
      </div>
    </div>
  );
}

export default Gameover;
