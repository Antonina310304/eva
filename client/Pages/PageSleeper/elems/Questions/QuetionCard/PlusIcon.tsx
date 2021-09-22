import React from 'react';

interface PlusIconProps {
  className: string;
}

function PlusIcon({ className }: PlusIconProps) {
  return (
    <svg
      className={className}
      width='13'
      height='13'
      viewBox='0 0 13 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M6.37932 0.188477V12.1885M0.382812 6.18986H12.3828' stroke='black' />
    </svg>
  );
}

export default PlusIcon;
