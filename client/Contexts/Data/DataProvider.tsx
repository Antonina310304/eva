import React, { createElement, useState } from 'react';

import { getDataContext } from './DataContext';

const DataProvider = ({ body, children }) => {
  const DataContext = getDataContext();
  const [state, setState] = useState(body);

  return (
    <DataContext.Consumer>
      {(context) => {
        const value = { ...context, body: state, update: setState };

        return createElement(DataContext.Provider, { value }, children);
      }}
    </DataContext.Consumer>
  );
};

export default DataProvider;
