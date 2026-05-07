import { Component } from 'react';

import type { ErrorTestButtonProps } from './error-boundary.types';

class ErrorTestButton extends Component<ErrorTestButtonProps> {
  state = {
    shouldThrow: false,
  };

  handleErrorClick = () => {
    this.setState({ shouldThrow: true });
  };

  componentDidUpdate() {
    if (this.state.shouldThrow) {
      this.setState({ shouldThrow: false });
      throw new Error(
        'This is a test error from the Error Test Button component.'
      );
    }
  }

  render() {
    return (
      <button
        onClick={this.handleErrorClick}
        className="mt-4 rounded bg-yellow-500 px-4 py-2 text-white transition-colors hover:bg-yellow-600"
      >
        Test Error Button
      </button>
    );
  }
}

export default ErrorTestButton;
