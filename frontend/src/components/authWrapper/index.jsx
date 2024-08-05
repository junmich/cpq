import React from 'react';
import PropTypes from 'prop-types';

import useAuth from '../../hooks/use-auth';

const AuthWrapper = ({ children }) => {
  useAuth();
  return <>{children}</>;
};

AuthWrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AuthWrapper;