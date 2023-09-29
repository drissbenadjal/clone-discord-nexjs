import { createContext, useState } from "react";

const LoadingContext = createContext();

import PropTypes from 'prop-types';

const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LoadingContext, LoadingContextProvider };
