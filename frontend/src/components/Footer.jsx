import React from 'react';
import { fontBold, purple, logo } from '../inlineStyles.js';

const Footer = () => {
  return (
    <div className="text-center p-4">
      © 2022 Copyright:{' '} 
      <span style={{ ...purple, ...fontBold, ...logo }}>VG Price Tracker 🎮</span>
    </div>
  );
};

export default Footer;
