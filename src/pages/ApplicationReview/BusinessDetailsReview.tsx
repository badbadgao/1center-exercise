import * as React from 'react';

import TextView from 'components/TextView';
import { TBusinessDetail } from 'models/type';

interface IBusinessDetailReview {
  businessDetail: TBusinessDetail;
}

const BusinessDetailReview = ({ businessDetail }: IBusinessDetailReview): JSX.Element => {
  const { companyName, tradingName, companyNumber, registrationDate, country, address } = businessDetail;

  return (
    <>
      <h4 className="textview__title">Business details</h4>
      <div className="textview__row">
        <TextView label="Company name" value={companyName} />
        <TextView label="Trading name" value={tradingName} />
      </div>
      <div className="textview__row">
        <TextView label="Company number" value={companyNumber} />
        <TextView label="Registration date" value={registrationDate} />
      </div>
      <div className="textview__row">
        <TextView label="Country" value={country} />
        <TextView label="Address" value={address} />
      </div>
    </>
  );
};

export default BusinessDetailReview;
