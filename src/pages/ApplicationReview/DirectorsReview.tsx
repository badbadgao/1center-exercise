import * as React from 'react';

import TextView from 'components/TextView';
import { TDirector } from 'models/type';

interface IDirectorsReview {
  directors: TDirector[];
}

const DirectorsReview = ({ directors }: IDirectorsReview): JSX.Element => {
  return (
    <>
      <h4 className="textview__title">Directors</h4>
      {directors.map(({ directorName, email }, index) => {
        return (
          <div className="textview__row" key={index}>
            <TextView label={`Director ${index + 1} name`} value={directorName} />
            <TextView label="Email" value={email} />
          </div>
        );
      })}
    </>
  );
};

export default DirectorsReview;
