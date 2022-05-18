import React from "react";
import PropTypes from 'prop-types';
import { fontBold, headerColor } from '../inlineStyles.js';

const DefaultHeader = (props) => {
  return (
    <div>
      <h1
        className="shadow mb-5 p-2 d-flex justify-content-between"
        style={{ ...headerColor, ...fontBold }}
      >
        <span>VG Price Tracker 🎮</span>
        {props.children}
      </h1>
    </div>
  );
};

DefaultHeader.propTypes = {
  children: PropTypes.object,
};

export default DefaultHeader;