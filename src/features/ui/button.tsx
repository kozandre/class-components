import { Component } from 'react';

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

class Button extends Component<ButtonProps> {
  render() {
    const {
      text = 'Click',
      onClick,
      type = 'button',
      disabled = false,
      className = '',
    } = this.props;

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${className}`}
      >
        {text}
      </button>
    );
  }
}

export default Button;
