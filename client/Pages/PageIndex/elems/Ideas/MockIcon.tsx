import React from 'react';

function MockIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width='60'
      height='61'
      viewBox='0 0 60 61'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='30' cy='30.5557' r='30' fill='white' />
    </svg>
  );
}

export default MockIcon;
