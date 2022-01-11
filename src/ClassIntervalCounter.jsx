import PropTypes from 'prop-types';
import { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class ClassIntervalCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      someOtherState: 'some other state', // In class components, state is merged
    };
    this.resetCount = this.resetCount.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Its main function is to ensure that the state and props are in sync for when it’s required
    return null;
  }

  resetCount() {
    this.setState({ count: 0 });
  }

  render() {
    return (
      <h3>
        <pre>Class:</pre> Count: {this.state.count}
        <div>
          <button onClick={this.resetCount}>Reset Count</button>
        </div>
      </h3>
    );
  }

  componentDidMount() {
    if (this.props.shouldRun) {
      this.createInterval();
    }
  }

  static getDerivedStateFromError(error) {
    return null; // No change in state
  }

  // Inheriting from PureComponent does exactly the same and is suggested
  shouldComponentUpdate(nextProps, nextState) {
    // shallowCompare performs a shallow equality check on the current props and nextProps objects as well as the current state and nextState objects.
    // It does this by iterating on the keys of the objects being compared and returning true when the values of a key in each object are not strictly equal.
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.shouldRun) {
      if (prevProps.intervalMilliseconds !== this.props.intervalMilliseconds) {
        this.disposeInterval();
        this.createInterval();
      } else if (!prevProps.shouldRun) {
        this.createInterval();
      }
    } else {
      this.disposeInterval();
    }
  }

  createInterval() {
    this.timer = setInterval(() => {
      this.setState((state, props) => {
        return { count: state.count + 1 };
      });
    }, this.props.intervalMilliseconds);
  }

  disposeInterval() {
    if (this.timer) {
      console.log('clearing interval');
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidCatch(error, errorInfo) {
    // Catches exceptions generated in descendant components. Unhandled exceptions will cause
    // the entire component tree to unmount.
    console.error(error, errorInfo);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Runs before React applies the result of `render` to the document, and
    // returns an object to be given to componentDidUpdate. Useful for saving
    // things such as scroll position before `render` causes changes to it.
    return null;
  }
}

ClassIntervalCounter.propTypes = {
  intervalMilliseconds: PropTypes.number.isRequired,
  shouldRun: PropTypes.bool.isRequired,
};

ClassIntervalCounter.defaultProps = {
  intervalMilliseconds: 1000,
};

export default ClassIntervalCounter;
