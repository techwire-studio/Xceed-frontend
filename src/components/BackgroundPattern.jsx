// BackgroundPattern.js
import React from 'react';

/**
 * A reusable component that provides a consistent line pattern background
 * @param {Object} props - Component props
 * @param {string} props.lineColor - The color of the lines (hex code, rgb, etc.)
 * @param {string} props.backgroundColor - The background color (defaults to transparent)
 * @param {React.ReactNode} props.children - Child components to render within this background
 * @param {string} props.className - Additional CSS classes to apply
 * @param {Object} props.style - Additional inline styles to apply
 * @returns {React.ReactElement} - The background pattern component with children
 */
const BackgroundPattern = ({ 
  lineColor = '#E1E1E1', 
  backgroundColor = 'transparent',
  children, 
  className = '', 
  style = {}
}) => {
  const patternStyle = {
    backgroundImage: `
      repeating-linear-gradient(
        to right,
        ${backgroundColor},
        ${backgroundColor} 6%,
        ${lineColor},
        ${lineColor} calc(6% + 1px),
        ${backgroundColor} calc(6% + 1px),
        ${backgroundColor} calc(6% + 1.5%),
        ${lineColor},
        ${lineColor} calc(6% + 1.5% + 1px),
        ${backgroundColor} calc(6% + 1.5% + 1px),
        ${backgroundColor} 12.5%
      )
    `,
    backgroundSize: '100% 100%',
    position: 'relative',
    ...style
  };

  return (
    <div className={`background-pattern ${className}`} style={patternStyle}>
      {children}
    </div>
  );
};

export default BackgroundPattern;