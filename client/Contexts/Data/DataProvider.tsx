import React, { FC, createElement, useState } from 'react';

import { getDataContext } from './DataContext';

export interface DataProviderProps {
  body: unknown;
}

const DataProvider: FC<DataProviderProps> = ({ body, children }) => {
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
