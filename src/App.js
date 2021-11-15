import "./App.css";
import Circle from "./components/Circle.js";
import { circles } from "./components/circles";

import React, { Component } from "react";

class App extends Component {
  state = {
    circles: [
      { id: 1, color: "#f9c80e" },
      { id: 2, color: "#ea3546" },
      { id: 3, color: "#662e9b" },
      { id: 4, color: "#f86624" },
    ],
  };

  render() {
    return (
      <div className="App">
        <h1>Speed Game</h1>
        <div className="gamearea">
          <div className="circlearea">
            {circles.map((c) => (
              <Circle key={c.id} color={c.color} id={c.id} />
            ))}
          </div>
          <div className="buttoncontainer">
            <button className="start">Start</button>
            <button className="stop">Stop</button>
          </div>
        </div>
        <div className="score">
          <p className="currentscore">Current Score: </p>
        </div>
      </div>
    );
  }
}

export default App;
