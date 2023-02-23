import * as React from 'react';

import './Button.css';

interface IButtonProps {
  rootClass?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ rootClass = '', children, onClick, disabled }: IButtonProps): JSX.Element => {
  return (
    <button className={`button ${rootClass}`} onClick={() => onClick?.()} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
