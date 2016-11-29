/*---
layout: default
  ---*/

export default class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <h1>Hello nigga!</h1>
        <h5>Count: { this.state.count }</h5>
        <button onClick={ () => this.setState((state) => ++state.count) }>
          Increment
        </button>
      </div>
    );
  }
}
