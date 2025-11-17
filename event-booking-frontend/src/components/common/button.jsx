// src/components/common/Button.js
import React from 'react';
import '../assests/css/button.css';
// Reusable button component that takes type (primary, danger, secondary)
const Button = ({ children, type = 'button', btnStyle = 'primary', onClick, disabled = false }) => {
  
  // Maps the prop to the CSS class defined in styles.css
  const className = `btn btn-${btnStyle}`; 

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;