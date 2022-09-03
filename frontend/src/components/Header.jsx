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
        <span> 
          {/* <span> </span>
          <span style={{backgroundColor:'#bfaddc', borderRadius: '10px', opacity:'50'}}>
            <span style={{opacity:'0'}}>.</span>
            <span style={{color:'blue'}}>O</span>
            <span style={{color:'red'}}>Z</span>
            <span style={{opacity:'0'}}>.</span>
          </span>

          <span> </span> */}
          VG Price Tracker 🎮
        </span>
        {props.children}
      </h1>
    </div>
  );
};

DefaultHeader.propTypes = {
  children: PropTypes.object,
};

export default DefaultHeader;