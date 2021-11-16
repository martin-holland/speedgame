import "./App.css";
import Circle from "./components/Circle.js";
import { circles } from "./components/circles";
import React, { Component } from "react";
import Gameover from "./components/Gameover";

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: 0,
    gameOver: false,
    pace: 1500,
  };

  timer = undefined;

  clickHandler = (id) => {
    console.log("you clicked: ", id);

    if (this.state.current !== id) {
      this.stopHandler();
      return;
    }
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
      pace: this.state.pace * 0.95,
    });

    this.timer = setTimeout(this.nextCircle, this.state.pace);
    console.log("Active Circle is ", this.state.current);
  };

  startHandler = () => {
    this.nextCircle();
  };

  stopHandler = () => {
    clearTimeout(this.timer);
    this.setState({
      gameOver: true,
      current: 0,
    });
  };

  closeHandler = () => {
    this.setState({
      gameOver: false,
      score: 0,
      pace: 1500,
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.gameOver && (
          <Gameover score={this.state.score} close={this.closeHandler} />
        )}
        <h1>Speed Game</h1>
        <div className="gamearea">
          <div className="circlearea">
            {circles.map((c) => (
              <Circle
                key={c.id}
                color={c.color}
                id={c.id}
                click={() => this.clickHandler(c.id)}
                active={this.state.current === c.id}
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
