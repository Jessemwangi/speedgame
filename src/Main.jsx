import React from "react";
import Buttons from "./views/Buttons";
import Circles from "./views/Circles";
import Endgame from "./views/Endgame";
import GameLifes from "./views/GameLifes";
import click from "./sounds/start.wav";
import scoresounds from "./sounds/rain.wav";
import goals from "./sounds/goal.wav";
import mybgsoungs from "./sounds/background.wav";
import Modal from "./views/Modal";
import "./Main.css";


const mybgsoung = new Audio(mybgsoungs);
const goal = new Audio(goals);
const scoresound = new Audio(scoresounds);
const gamestart = new Audio(click);

class Main extends React.Component {

  state = {
    circles: [1, 2, 3, 4],
    lives: 5,
    gameStart: 'false',
    timeinterval: 1500,
    circleNo: undefined,
    scores: 0,
    pace: 20,
    counter: 0, 
    newstyle: "",
    heartActive: <span>&#10084;&#65039;</span>,
    timeElaspse: 0,
    showmodal: false,
    sounds: false,
    slidesound: 'off'
  };

  gametimeout;
  lifeArray = Array(5).fill(0);

  nextCircle = () => {
    let nextActive;
    if (this.state.slidesound === 'on') {
      mybgsoung.play()
    }

    if (this.state.timeElaspse >= 10 || this.state.lives === 0) {
      this.EndGameHandle();
      return;
    }

    this.timer = setTimeout(this.nextCircle, this.state.timeinterval);
    nextActive = this.RandomNumber(
      this.state.circleNo,
      this.state.circles.length
    );
    this.setState({
      circleNo: nextActive,
      timeElaspse: this.state.timeElaspse + 1,
    });

  };

  StartGameHandle = (e) => {
    if (this.state.slidesound === 'on') {
      gamestart.play();
    }

    this.setState({
      lives: 5,
      timeElaspse: 0,
      gameStart: 'true',
    });

    this.nextCircle();
  };

  gameCircles = () =>
    this.state.circles.map((item, index) => {
      return (
        <div key={index}>
          <Circles
            index={index}
            gameStart={this.state.gameStart}
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

  GameReset = () => {

    window.location.reload();
  }

  EndGameHandle = (e) => {
    if (this.state.slidesound === 'on') {
      goal.play();
    }
    clearTimeout(this.gametimeout);
    this.setState({
      gameStart: 'false',
      showmodal: true,
      timeElaspse: 10,
      circleNo: undefined,
    });

  };

  ClickHandler = (e, index) => {

    if (index === this.state.circleNo) {
      if (this.state.slidesound === 'on') {
        scoresound.play();
      }
      this.setState({
        scores: this.state.scores + 1,
        counter: this.state.counter + 1,
        timeElaspse: this.state.timeElaspse - 1,

      });
      if (this.state.scores >= 3) {
        this.setState({
          timeinterval: this.state.timeinterval - (this.state.scores / this.state.pace)
        })
        this.ScoreReward();
      }
      if (this.state.counter === 20) {
        this.IncreaseLevel();
      }
    } else {
      this.setState({
        lives: this.state.lives - 1,
      });
      if (this.state.lives === 0) {
        this.setState({

          gameStart: false,
        });
        this.EndGameHandle();
      }
      this.lifeArray.pop();

    }

  };

  ScoreReward = () => {

    if (this.state.scores >= 5) {
      this.setState({
        newstyle: "above20",
      });
    } else if (this.state.scores >= 7) {
      this.setState({
        newstyle: "above40",

      });
    } else if (this.state.scores >= 9) {
      this.setState({
        newstyle: "above60",

      });
    } else if (this.state.scores >= 12) {
      this.setState({
        newstyle: "above80",

      });
    } else if (this.state.scores >= 15) {
      this.setState({
        newstyle: "above100",

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

  ChangeSounds = () => {
    if (this.state.sounds === true) {
      this.setState({
        sounds: false,
        slidesound: 'off'
      })

    }
    else if (this.state.sounds === false) {
      this.setState({
        sounds: true,
        slidesound: 'on'
      })
     
    }

  }
  render() {
    const GameLifesHearts = this.lifeArray.map((index) => {
      return <GameLifes key={Math.random()} hearts={this.state.heartActive} />;
    });

    return (
      <div className={this.state.newstyle + ' maindiv'}>
        <div className="setting">
          <div className="soundsetting">
            <p style={{ paddingRight: "1rem" }}>sounds : {this.state.slidesound}</p>
            <div onClick={(e) => this.ChangeSounds(e)}
              className={this.state.slidesound + ' soundsOnOf'}>
              <div className="soundControl" ></div>
            </div>
          </div>

        </div>
        <main>

          <div className="gameStatistics">
            <p>Score: {this.state.scores}</p>

            <div style={{ display: "inline-block" }}>
              {GameLifesHearts}
            </div>
          </div>
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {this.state.lives > 0 ? (
              this.gameCircles()
            ) : (
              <Endgame scores={this.state.scores} celebrate={this.state.newstyle} />
            )}
          </div>
        </main>
        <Buttons
          StartGameHandle={(e) => this.StartGameHandle(e)}
          start={this.state.gameStart}
          EndGameHandler={(e) => this.EndGameHandle(e)}
        />
        {this.state.showmodal && (
          <Modal scores={this.state.scores} GameReset={this.GameReset} />
        )}
      </div>
    );
  }
}

export default Main;
