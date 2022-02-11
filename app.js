console.log("connected");

// when you click the timer it makes a new object that lasts 20 min
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: 0, start: Date.now() };
    }

    timeElapsed() {
        this.setState(state => ({
            time: ((Date.now() - state.start) / 1000)
        }));
        //check for loop escape
        timerStop();
    }

    // 1200 seconds in 20 minutes
    timerStop() {
        if (this.state.time > 5) {
            console.log("timer done")
            clearInterval(this.interval);
        }
    }

    componentDidMount() {
        console.log("mounted");
        console.log(this.state.time);
        this.interval = setInterval(() => this.timeElapsed(), 1000);
    }

    componentWillUnmount() {
        console.log("unmounted")
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <p>It's working: {Math.floor(this.state.time)}</p>
            </div>
        );
    }
}

class StartButton extends React.Component {
    render() {
        return (
            <div>
                {/* <Timer /> */}
                <button>Start</button>
            </div>
        );

    }
}



ReactDOM.render(
    <StartButton />,
    document.getElementById("root")
);
