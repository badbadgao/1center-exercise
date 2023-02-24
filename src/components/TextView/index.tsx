import * as React from 'react';

import './TextView.css';

interface ITextView {
  label: string;
  value: string;
}

const TextView = ({ label, value }: ITextView): JSX.Element => {
  return (
    <div className="textView__item">
      <span className="textView__item-label">{label}:</span>
      <span>{value}</span>
    </div>
  );
};

export default TextView;
