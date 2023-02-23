import * as React from 'react';

interface IProps {
  placeHolder?: string;
  size?: number;
}

const EmailField = ({ placeHolder, size = 30 }: IProps): JSX.Element => {
  return <input id="email" type="email" placeholder={placeHolder} size={size} />;
};

export default EmailField;
