import React from "react";
import Circles from "./views/Circles";

class Main extends React.Component {
  state = {
    circles: [1, 2, 3, 4],
    lives: 5,
    timeinterval: 10,
    circleNo: 0,
    scores: 0,
  };

  IncreaseLevel = () => {
    const num = this.state.circles.length + 1;
    let newCircle = [...this.state.circles, num];
    this.setState({
      ...this.state,
      circles: newCircle,
    });
    console.log(this.state.circles);
  };

  gameCircles = () =>
    this.state.circles.map((item, index) => {
      return (
        <div key={index}>
          <Circles
            index={index}
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

  ClickHandler = (e, index) => {
    let nextCircle = this.RandomNumber(index, this.state.circles.length);

    if (index === this.state.circleNo) {
      this.setState({
        scores: this.state.scores + 1,
        circleNo: nextCircle,
      });
    } else {
      this.setState({
        circleNo: nextCircle,
        lives: this.state.lives - 1,
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <p>Score: {this.state.scores}</p>
          <p>Lives : {this.state.lives}</p>
        </div>
        <div
          style={{
            width: "70%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr ",
          }}
        >
          {this.gameCircles()}
        </div>
      </div>
    );
  }
}

export default Main;
