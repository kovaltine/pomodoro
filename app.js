class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      begin: 0,
      gap: 0,
      min: "20",
      sec: "00",
    };
    // binding "this" prevents scope issues when changing the state in the function
    this.beginTimer = this.beginTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  beginTimer() {
    this.setState((state) => {
      return {
        begin: Date.now(),
      };
    });
    this.showTimer();
    this.interval = setInterval(() => this.timeElapsed(), 1000);
  }

  // set sec and min that will be shown in the timer
  showTimer() {
    var duration = 10 - this.state.time;
    if (duration == 0) {
      this.timerEnd();
    } else {
      this.setState((state) => {
        return {
          min: this.getMinutes(duration),
          sec: this.getSeconds(duration),
        };
      });
    }
  }

  getSeconds(duration) {
    var sec = Math.floor(duration % 60);
    if (sec < 10) {
      return "0" + sec;
    } else {
      return sec;
    }
  }

  getMinutes(duration) {
    var min = Math.floor(duration / 60);
    if (min < 10) {
      return "0" + min;
    } else {
      return min;
    }
  }

  timeElapsed() {
    this.setState((state) => ({
      time: Math.floor((Date.now() - state.begin) / 1000) + state.gap,
    }));
    this.showTimer();
  }

  // timer will play a sound when it's over
  timerEnd() {
    const alarm = new Audio("/resources/analog_alarm.wav");
    alarm.play();
    setTimeout(function () {
      alarm.pause();
      alarm.currentTime = 0;
    }, 3000);
    this.resetTimer();
  }

  //saves the "gap" so the timer still starts at the right time when resumed
  stopTimer() {
    this.setState((state) => {
      return { gap: state.time };
    });
    // stop running the timer
    clearInterval(this.interval);
  }

  // reset all the states to 0
  resetTimer() {
    clearInterval(this.interval);
    this.setState({
      begin: 0,
      time: 0,
      gap: 0,
    });
    this.showTimer();
  }

  render() {
    return (
      <div>
        <p id="timer">{this.state.min + ":" + this.state.sec}</p>
        <div id="timer_buttons">
          <button id="start" onClick={this.beginTimer}>
            Start
          </button>
          <button id="stop" onClick={this.stopTimer}>
            Stop
          </button>
          <button id="reset" onClick={this.resetTimer}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Timer />, document.getElementById("root"));
