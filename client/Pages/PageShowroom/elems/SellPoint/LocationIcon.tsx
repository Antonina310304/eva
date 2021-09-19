import { memo } from 'react';

interface LocationIconProps {
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

function LocationIcon({ className }: LocationIconProps) {
  return (
    <svg
      className={className}
      width='30'
      height='30'
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15Z'
        fill='#404040'
      />
      <g clipPath='url(#clip0)'>
        <path
          d='M14.9992 23.55C14.9992 23.55 19.7806 17.3555 20.3436 16.1377C20.9035 14.9267 21.2992 13.6747 21.2992 12.5352C21.2992 10.9158 20.6312 9.36619 19.448 8.22639C18.2653 7.08714 16.6648 6.44995 14.9992 6.44995C13.3337 6.44995 11.7331 7.08714 10.5504 8.22639C9.36722 9.36619 8.69922 10.9158 8.69922 12.5352C8.69922 13.6747 9.09497 14.9267 9.65482 16.1377C10.2178 17.3555 14.9992 23.55 14.9992 23.55ZM14.9992 15.1518C14.267 15.1518 13.5692 14.8714 13.0581 14.3791C12.5478 13.8875 12.2656 13.2258 12.2656 12.5408C12.2656 11.8558 12.5478 11.1941 13.0581 10.7025C13.5692 10.2102 14.267 9.92984 14.9992 9.92984C15.7314 9.92984 16.4293 10.2102 16.9403 10.7025C17.4506 11.1941 17.7329 11.8558 17.7329 12.5408C17.7329 13.2258 17.4506 13.8875 16.9403 14.3791C16.4293 14.8714 15.7314 15.1518 14.9992 15.1518Z'
          fill='white'
          stroke='white'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <rect x='0.5' y='0.5' width='29' height='29' rx='14.5' stroke='#404040' />
      <defs>
        <clipPath id='clip0'>
          <rect width='18' height='18' fill='white' transform='translate(6 6)' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default memo(LocationIcon);
