import { React } from 'react';
import PropTypes from 'prop-types';

const Error = (props) => {
  return <p className="text-start text-danger mt-1 mb-0">{props.error}</p>;
};

Error.propTypes = {
  error: PropTypes.string,
};

export default Error;
