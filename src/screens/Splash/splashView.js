import React,{Component} from 'react'
import { Animated } from 'react-native'

const splashLogo = require('../../assets/images/logo.png')

export default class SplashView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(1),
    }
  }

  componentWillUnmount() {
    this.timeInterval && clearInterval(this.timeInterval)
    this.timeTimeout && clearTimeout(this.timeTimeout)
  }

  componentDidMount() {
    this.animTimer()
    this.timeInterval = setInterval(() => this.animTimer(), 2000)
  }

  animTimer() {
    this.light()
    this.timeTimeout = setTimeout(() => this.dark(), 1000)
  }

  light() {
    Animated.timing(this.state.opacity, { toValue: 0, duration: 1000 }).start()
  }

  dark() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 1000 }).start()
  }

  render() {
    return (
      <Animated.Image
        style={{
          opacity: this.props.dontAnimate ? 1 : this.state.opacity,
          width: 300,
          height: 300,
        }}
        resizeMode="contain"
        source={splashLogo}
      />
    )
  }
}
