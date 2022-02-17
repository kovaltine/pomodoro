
// when you click the timer it makes a new object that lasts a set time interval
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            time: 0,
            begin: 0, 
            delay: 0, 
            min: 0, 
            sec: 0 
        };
        // binding "this" prevents scope issues when changing the state in the function
        this.beginTimer = this.beginTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.showTimer = this.showTimer.bind(this);
    }

    // need to fix time bug: goes to 18:0 and then to 18:59
    showTimer() {
        var duration = 120 - this.state.time;
        if (duration == 0){
            timerEnd();
        } else {
            this.setState(state => {
                if(duration >= 60 && duration % 60 == 0){
                    return {
                        min: 19 - (Math.floor(duration / 60)),
                        sec: 59
                    }        
                } else {
                    return {
                        sec: (Math.floor(duration % 60)) - 1
                    }
                }
            })
        }
    }

    timeElapsed() {
        this.setState((state) => ({
            time: Math.floor((Date.now() - state.begin)/1000) + state.delay
        }));
        this.showTimer();
    }

    // 1200 seconds in 20 minutes
    timerEnd() {
        const alarm = new Audio('/resources/analog_alarm.wav')
        alarm.play();
        setTimeout(function () {
            alarm.pause();
            // can i control what second it starts at?
            alarm.currentTime = 0;
        }, 1000); // alarm only lasts 1 second
        this.resetTimer();
        
    }

    beginTimer() {
        this.setState((state) => {
            return { 
                begin: Date.now(), 
                min: 19,
                sec: 59 
            }
        });
        this.interval = setInterval(() => this.timeElapsed(), 1000);
    }

    stopTimer() {
        this.setState((state) => {
            return { delay: state.time }
        })
        clearInterval(this.interval);
    }

    resetTimer(){
        clearInterval(this.interval);
        this.setState({
            begin: 0, 
            time: 0, 
            delay: 0
        });
        this.showTimer();     
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <p>Countdown: { this.state.min + ":" + this.state.sec }</p>
                <button id='begin' onClick={this.beginTimer}>Start</button>
                <button id='stop' onClick={this.stopTimer}>Stop</button>
                <button id='reset' onClick={this.resetTimer}>Reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Timer />, document.getElementById("root"));
