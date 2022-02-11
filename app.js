console.log("connected");

// when you click the timer it makes a new object that lasts 20 min
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: Date.now() };
    }
    timeElapsed() {
        this.setState(state => ({
            time: ((Date.now() - state.time) / 1000)
        }));
    }
    componentDidMount() {
        console.log("mounted");
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



ReactDOM.render(
    <Timer />,
    document.getElementById("root")
);
