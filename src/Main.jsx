import React from "react";
import Buttons from "./views/Buttons";
import Circles from "./views/Circles";
import Endgame from "./views/Endgame";

class Main extends React.Component {
  state = {
    circles: [1, 2, 3, 4],
    lives: 5,
    timeinterval: 10,
    circleNo: 0,
    scores: 0,
    counter:0,
    newstyle:"",
    
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


EndGameHandle = () =>{
  return (
<Endgame scores={this.state.scores}/>
  );
}

  ClickHandler = (e, index) => {
    let nextCircle = this.RandomNumber(index, this.state.circles.length);
  
    if (index === this.state.circleNo) {
      
      this.setState({
        scores: this.state.scores + 1,
        circleNo: nextCircle,
        counter: this.state.counter + 1,
      });
      if (this.state.counter ===4){
        this.ScoreReward(this.state.scores);
      }
    } 
    else {
      this.setState({
        circleNo: nextCircle,
        lives: this.state.lives - 1,
      });
    }
  };

  ScoreReward = () =>{

    this.IncreaseLevel()
 
    if (this.state.scores >= 5){
      this.setState({
        newstyle : "endGame",
        
      })
    }
  }

  IncreaseLevel = () => {
    const num = this.state.circles.length + 1;
    let newCircle = [...this.state.circles, num];
    console.log(newCircle,num);
    this.setState({
      circles: newCircle,
      counter:0
    });
    console.log(this.state.circles);
  };

  render() {
    return (
      <div className={this.state.scores > 4 ? this.state.newstyle : ''}>
        <div >
          <p>Score: {this.state.scores}</p>
          <p>Lives : {this.state.lives}</p>
        </div>
        <div
          style={{
            width: "70%",
            display: "flex",
            gap:"2rem",
            flexWrap:"wrap",
          }}>
          {this.state.lives > 0 ? this.gameCircles() : this.EndGameHandle() }
        </div>
        <Buttons/>
      </div>
    );
  }
}

export default Main;
