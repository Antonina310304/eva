import React from 'react';

function Line({ className, y }: { className: string; y: string }) {
  return (
    <svg
      width='100%'
      height='121'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <line x1='0%' y1={y} x2='100%' y2={y} stroke='#989898' />
    </svg>
  );
}

export default Line;
