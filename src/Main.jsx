import React from "react";
import Buttons from "./views/Buttons";
import Circles from "./views/Circles";
import Endgame from "./views/Endgame";
import GameLifes from "./views/GameLifes";
import Modal from "./views/Modal";
import "./Main.css";

class Main extends React.Component {
  state = {
    circles: [1, 2, 3, 4],
    lives: 5,
    gameStart: 'false',
    timeinterval: 1500,
    circleNo: undefined,
    scores: 0,
    counter: 2, // help in culculating fails
    newstyle: "",
    heartActive: <span>&#10084;&#65039;</span>,
    timeElaspse: 0,
    showmodal:false,
  };

  gametimeout;
  lifeArray = Array(5).fill(0);

  nextCircle = () => {
    let nextActive;
    console.log(this.lifeArray)
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
    console.log(this.state.timeElaspse);
  };

  StartGameHandle = (e) => {
console.log("start");
    this.setState({
      lives: 5,
      timeElaspse: 0,
      gameStart: 'true',
    });

    console.log(this.state.gameStart);
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

  GameReset = () =>{
console.log('you click me');
window.location.reload();
  }

  EndGameHandle = (e) => {
    console.log("end");
    clearTimeout(this.gametimeout);
    this.setState({
      gameStart: 'false',
      showmodal:true,
      timeElaspse: 10,
      circleNo: undefined,
    });
    console.log(this.state);
  };

  ClickHandler = (e, index) => {
    console.log(index, this.state.circleNo);

    if (index === this.state.circleNo) {
      this.setState({
        scores: this.state.scores + 1,
        counter: this.state.counter + 1,
        timeElaspse: this.state.timeElaspse - 1,
      });

      if (this.state.scores >= 20) {
        this.ScoreReward();
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
    console.log(this.lifeArray.length);
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
        timeinterval: this.state.timeinterval * 0.09,
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
      <div className={this.state.newstyle + 'maindiv'}>
        <main>
          <div className="gameStatistics">
            <p>Score: {this.state.scores}</p>

            <div style={{ display: "inline-block" }}>
              Lives : {this.state.lives} ,{GameLifesHearts}
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
              <Endgame scores={this.state.scores} />
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
