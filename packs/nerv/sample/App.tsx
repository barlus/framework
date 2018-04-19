import * as React from '../core/index'
import '../devtools/index'

function Time({time}) {
  return <div>Time:{time.toString()}</div>
}

class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.updateTimer = this.updateTimer.bind(this)
  }

  state = {
    time: new Date()
  }

  updateTimer() {
    this.setState({
      time: new Date()
    })
  }

  componentDidMount() {
    setInterval(this.updateTimer, 1000)
  }

  render() {
    return <Time time={this.state.time}/>
  }
}

React.render(<App/>, document.body);
