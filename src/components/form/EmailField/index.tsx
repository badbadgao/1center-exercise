import * as React from 'react';
import '../index.css';
import './EmailField.css';

interface IProps {
  placeHolder?: string;
  size?: number;
  rootClass?: string;
  inputClass?: string;
  onChange: (value: string) => void;
  value: string;
}

const EmailField = ({ placeHolder, rootClass = '', inputClass = '', onChange, value }: IProps): JSX.Element => {
  return (
    <div className={`form__field email ${rootClass}`}>
      <label className="form__label" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        className={`form__input ${inputClass}`}
        onChange={(e): void => {
          const value = e.target.value;
          onChange(value);
        }}
        value={value}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default EmailField;
