console.log("connected");

// when you click the timer it makes a new object that lasts 20 min
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: 0, start: 0 };
        // binding "this" prevents scope issues when changing the state in the function
        this.startTimer = this.startTimer.bind(this);
    }

    timeElapsed() {
        this.setState(state => ({
            time: ((Date.now() - state.start) / 1000)
        }));
        this.timerStop(); 
    }

    // 1200 seconds in 20 minutes
    timerStop() {
        var end = 5;
        if (this.state.time > end) {
            // insert sound when the timer stops
            console.log("timer done")
            this.componentWillUnmount();
        }
    }

    startTimer() {
        console.log("setStart")
        this.setState((state) => {
            //maybe have to return this state
            return { start: Date.now() }
        });
        this.interval = setInterval(() => this.timeElapsed(), 1000);
    }

    componentDidMount() {
        console.log("mounted");
        console.log(this.state.time);
        console.log(this.state.start);
    }

    componentWillUnmount() {
        console.log("unmounted")
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <p>It's working: { Math.floor(this.state.time) }</p>
                <button id='start' onClick={this.startTimer}>Start</button>
            </div>
        );
    }
}

ReactDOM.render(<Timer />, document.getElementById("root"));
