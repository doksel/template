import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";

import s from "./LoaderLineBar.module.less";

class LoaderLineBar extends Component {
  state = {
    started: false,
    timer: null,
    interval: null
  };

  componentDidUpdate() {
    const { started, timer, interval } = this.state;

    if (started && !timer && interval) {
      this.setState({
        timer: setTimeout(() => {
          clearInterval(this.state.interval);

          this.LoadingBar.complete();

          this.setState({ timer: null, interval: null, started: false });
        }, 5000)
      });
    }
  }

  getRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { started, interval, timer } = this.state;

    if (nextProps.loader.isLoad && !started && !interval) {
      this.setState({
        started: true,
        interval: setInterval(() => {
          this.LoadingBar.add(this.getRandomNumber(15, 5));
        }, 1000)
      });
    } else if (started && !nextProps.loader.isLoad) {
      this.LoadingBar.complete();
      clearInterval(interval);
      clearTimeout(timer);
      this.setState({ started: false, interval: null, timer: null });
    }
  }

  render() {
    return (
      <div>
        <LoadingBar
          height={0}
          onRef={ref => (this.LoadingBar = ref)}
          color="#004bc1"
          className={s.loading_bar}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ loader }) => ({
  loader
});

export default connect(mapStateToProps)(LoaderLineBar);
