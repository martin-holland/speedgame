import "./App.css";
import Circle from "./components/Circle.js";
import { circles } from "./components/circles";
import React, { Component } from "react";
import { getAllByRole } from "@testing-library/react";

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: 0,
  };

  timer = undefined;
  pace = 1500;

  clickHandler = () => {
    this.setState({
      score: this.state.score + 10,
    });
  };

  nextCircle = () => {
    let nextActive;

    do {
      nextActive = getRndInteger(1, 4);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
    });

    this.pace *= 0.95;
    this.timer = setTimeout(this.nextCircle, this.pace);
    console.log("Active Circle is ", this.state.current);
  };

  startHandler = () => {
    this.nextCircle();
  };

  stopHandler = () => {
    clearTimeout(this.timer);
  };

  render() {
    return (
      <div className="App">
        <h1>Speed Game</h1>
        <div className="gamearea">
          <div className="circlearea">
            {circles.map((c) => (
              <Circle
                key={c.id}
                color={c.color}
                id={c.id}
                click={this.clickHandler}
              />
            ))}
          </div>
          <div className="buttoncontainer">
            <button className="start" onClick={this.startHandler}>
              Start
            </button>
            <button className="stop" onClick={this.stopHandler}>
              Stop
            </button>
          </div>
        </div>
        <div className="score">
          <p className="currentscore">Current Score: {this.state.score} </p>
        </div>
      </div>
    );
  }
}

export default App;
