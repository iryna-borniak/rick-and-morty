import React from 'react';

import './Spinner.scss';

export const Spinner: React.FC = () => (
  <div className="hollow-dots-spinner">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </div>
);
