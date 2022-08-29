import React from 'react';
import { fontBold, purple, logo } from '../inlineStyles.js';
import PropTypes from 'prop-types';

const DefaultHeader = (props) => {
  return (
    <div>
      <h1
        className="shadow mb-5 p-2 d-flex justify-content-between"
        style={{ ...purple, ...fontBold }}
      >
        <span style={logo}>BigBrain 🧠</span>
        {props.children}
      </h1>
    </div>
  );
};

DefaultHeader.propTypes = {
  children: PropTypes.object,
};

export default DefaultHeader;
