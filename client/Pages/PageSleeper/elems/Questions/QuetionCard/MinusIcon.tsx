import React from 'react';

interface MinusIconProps {
  className: string;
}

function MinusIcon({ className }: MinusIconProps) {
  return (
    <svg
      className={className}
      width='13'
      height='13'
      viewBox='0 0 13 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M6 6.54596V6.54297M0 6.54362H12' stroke='black' />
    </svg>
  );
}

export default MinusIcon;
