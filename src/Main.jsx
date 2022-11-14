import React from "react";
import Buttons from "./views/Buttons";
import Circles from "./views/Circles";
import Endgame from "./views/Endgame";
import GameLifes from "./views/GameLifes";
import "./Main.css";

class Main extends React.Component {
  state = {
    circles: [1, 2, 3, 4],
    lives: 5,
    gameStart: false,
    timeinterval: 1000,
    circleNo: "",
    scores: 0,
    counter: 0,
    newstyle: "",
    heartActive: <span>&#10084;&#65039;</span>,
    lifeArray: Array(5).fill(0),
  };

  gametimeout;
  lifeArray = Array(5).fill(0);

  StartGameHandle = (e) => {
    let nextCircle = this.RandomNumber(0, this.state.circles.length);
    this.setState({
      gameStart: true,
      circleNo: nextCircle,
    });

    this.gametimeout = setTimeout(
      this.StartGameHandle,
      this.state.timeinterval
    );
    if (this.state.lives >= 0) {
      this.state.lifeArray.splice(this.state.lives, 1);
    } else {
      this.EndGameHandle();
    }
  };

  gameCircles = () =>
    this.state.circles.map((item, index) => {
      return (
        <div key={index}>
          <Circles
            index={index}
            start={this.state.gameStart}
            circleNo={this.state.circleNo}
            Cclicked={(e) => this.ClickHandler(e, index)}
          />
        </div>
      );
    });

  RandomNumber = (currentvalue, CArrayLength) => {
    let randomno = Math.floor(Math.random() * CArrayLength);

    if (randomno !== currentvalue) {
      return randomno;
    } else {
      return this.RandomNumber(currentvalue, CArrayLength);
    }
  };

  EndGameHandle = () => {
    clearTimeout(this.gametimeout);

    return <Endgame scores={this.state.scores} />;
  };

  ClickHandler = (e, index) => {
    if (index === this.state.circleNo) {
      this.setState({
        scores: this.state.scores + 1,
        counter: this.state.counter + 1,
      });

      if (this.state.counter === 2) {
        this.ScoreReward();
      }
    } else {
      this.setState({
        lives: this.state.lives - 1,
        lifeArray: Array(this.state.lives).fill(0),
      });
      if (this.state.lives === 0) {
        this.setState({
          gameStart:false
        })
        this.EndGameHandle();
      }
      this.lifeArray.pop();

      console.log(this.state.lifeArray.length);
    }
  };

  ScoreReward = () => {
    this.IncreaseLevel();
    if (this.state.scores >= 15) {
      this.setState({
        newstyle: "above100",
      });
    } else if (this.state.scores >= 14) {
      this.setState({
        newstyle: "above80",
      });
    } else if (this.state.scores >= 11) {
      this.setState({
        newstyle: "above60",
      });
    } else if (this.state.scores >= 8) {
      this.setState({
        newstyle: "above40",
      });
    } else if (this.state.scores >= 5) {
      this.setState({
        newstyle: "above20",
        timeinterval: this.state.timeinterval - 50,
      });
    } else {
      this.setState({
        newstyle: "",
      });
    }
  };

  IncreaseLevel = () => {
    const num = this.state.circles.length + 1;
    let newCircle = [...this.state.circles, num];
    this.setState({
      circles: newCircle,
      counter: 0,
    });
  };

  render() {
    const GameLifesHearts = this.lifeArray.map((index) => {
      return <GameLifes key={Math.random()} hearts={this.state.heartActive} />;
    });

    return (
      <div className={this.state.newstyle}>
        <div>
          <div>
            <p>Score: {this.state.scores}</p>

            <div style={{ display: "inline-block" }}>
              Lives : {this.state.lives} ,{GameLifesHearts}
            </div>
          </div>
          <div
            style={{
              width: "70%",
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {this.state.lives > 0 ? this.gameCircles() : this.EndGameHandle()}
          </div>
        </div>
        <Buttons
          StartGameHandle={(e) => this.StartGameHandle(e)}
          start={this.state.gameStart}
        />
      </div>
    );
  }
}

export default Main;
