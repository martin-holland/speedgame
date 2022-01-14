import "./App.css";
import Circle from "./components/Circle.js";
import { circles } from "./components/circles";
import React, { Component } from "react";
import Gameover from "./components/Gameover";

import gameover from "./assets/sounds/gameover.mp3";
import bgSound from "./assets/sounds/bg.mp3";
import click from "./assets/sounds/water.mp3";

// import { db } from "./assets/firebase/firebase-config.js";
// import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";

let gameStartSound = new Audio(bgSound);
let gameOverSound = new Audio(gameover);
let clickSound = new Audio(click);

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: 0,
    gameOver: false,
    pace: 1500,
    rounds: 0,
    gameStart: false,
    results: [],
    name: "",
  };

  // resultsCollectionRef = collection(db, "results");
  timer = undefined;

  mutePage = () => {
    gameStartSound.muted = true;
    gameOverSound.muted = true;
    clickSound.muted = true;
  };

  unMutePage = () => {
    gameStartSound.muted = false;
    gameOverSound.muted = false;
    clickSound.muted = false;
  };

  clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      clickSound.currentTime = 0;
    }
  };

  clickHandler = (id) => {
    this.clickPlay();
    console.log("you clicked: ", id);

    if (this.state.current !== id) {
      this.stopHandler();
      return;
    }
    this.setState({
      score: this.state.score + 10,
      rounds: 0,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 5) {
      this.stopHandler();
      return;
    }
    let nextActive;

    do {
      nextActive = getRndInteger(1, 4);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });

    this.timer = setTimeout(this.nextCircle, this.state.pace);
    console.log("Active Circle is ", this.state.current);
    console.log("Rounds number: ", this.state.rounds);
  };

  startHandler = () => {
    gameStartSound.play();
    gameStartSound.loop = true;
    this.nextCircle();
    this.setState({
      gameStart: true,
    });
  };

  stopHandler = () => {
    gameStartSound.pause();
    gameOverSound.play();
    clearTimeout(this.timer);
    this.setState({
      gameOver: true,
      current: 0,
      gameStart: false,
    });
  };

  closeHandler = () => {
    this.setState({
      gameOver: false,
      score: 0,
      pace: 1500,
      rounds: 0,
    });
  };

  // componentDidMount() {
  //   this.getResultsFromDB();
  // }

  // getResultsFromDB = async () => {
  //   const data = await getDocs(this.resultsCollectionRef);
  //   this.setState({
  //     results: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
  //   });
  // };

  // addResultToDB = async () => {
  //   await addDoc(this.resultsCollectionRef, {
  //     name: this.state.name,
  //     score: this.state.clickcount,
  //     date: Timestamp.fromDate(new Date()),
  //   });
  //   this.getResultsFromDB();
  // };

  // onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   this.addResultToDB();
  //   this.resetGame();
  // };

  render() {
    return (
      <div className="App">
        {this.state.gameOver && (
          <Gameover score={this.state.score} close={this.closeHandler} />
        )}
        <h1>Water the plants!</h1>
        <div className="gamearea">
          <div className="circlearea">
            {circles.map((c) => (
              <Circle
                key={c.id}
                color={c.color}
                id={c.id}
                click={() => this.clickHandler(c.id)}
                active={this.state.current === c.id}
                disabled={this.state.gameStart}
              />
            ))}
          </div>
          <div className="buttoncontainer">
            <button
              disabled={this.state.gameStart}
              className="start"
              onClick={this.startHandler}
            >
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
        <div className="sounds">
          <button className="muteall" onClick={this.mutePage}>
            Mute
          </button>
          <button className="unmuteall" onClick={this.unMutePage}>
            Un-mute
          </button>
        </div>
      </div>
    );
  }
}

export default App;
