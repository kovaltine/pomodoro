class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            time: 0,
            begin: 0, 
            gap: 0, 
            min: 0, 
            sec: 0 
        };
        // binding "this" prevents scope issues when changing the state in the function
        this.beginTimer = this.beginTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.showTimer = this.showTimer.bind(this);
    }

    beginTimer() {
        this.setState((state) => {
            return { 
                begin: Date.now(), 
            }
        });
        this.showTimer();
        this.interval = setInterval(() => this.timeElapsed(), 1000);
    }

    showTimer() {
        // timer will last 20 minutes
        var duration = 1200 - this.state.time;
        if (duration == 0){
            this.timerEnd();
        } else {
            console.log(Math.floor(duration / 60));
            this.setState(state => {
                return {
                    min: Math.floor(duration / 60),
                    sec: (Math.floor(duration % 60))
                }
            })
        }
    }

    timeElapsed() {
        this.setState((state) => ({
            time: Math.floor((Date.now() - state.begin)/1000) + state.gap
        }));
        this.showTimer();
    }

    // timer will play a sound when it's over
    timerEnd() {
        const alarm = new Audio('/resources/analog_alarm.wav')
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
            return { gap: state.time }
        })
        // stop running the timer
        clearInterval(this.interval);
    }

    // reset all the states to 0
    resetTimer(){
        clearInterval(this.interval);
        this.setState({
            begin: 0, 
            time: 0, 
            gap: 0
        });
        this.showTimer();     
    }

    render() {
        return (
            <div>
                <h1 id="title">Pomodoro Timer</h1>
                <p id="timer">{ this.state.min + ":" + this.state.sec }</p>
                <div id="timer_buttons">
                    <button id="start" onClick={this.beginTimer}>Start</button>
                    <button id="stop" onClick={this.stopTimer}>Stop</button>
                    <button id="reset" onClick={this.resetTimer}>Reset</button>
                </div>
                
            </div>
        );
    }
}

ReactDOM.render(<Timer />, document.getElementById("root"));
