import React from 'react';

import './NoResults.scss';

export const NoResults: React.FC = () => {
  return (
    <div className="no-results-msg">
      <h2>No results found</h2>
      <p>Please try a different search term</p>
    </div>
  );
};
