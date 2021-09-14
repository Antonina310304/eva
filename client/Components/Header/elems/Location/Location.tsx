import React, { FC, HTMLAttributes, memo } from 'react';

import Link from '@UI/Link';
import styles from './Location.module.css';

export interface LocationProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  location: string;
  onClick?: () => void;
}

const Location: FC<LocationProps> = ({ location }) => {
  return (
    <Link className={styles.location} view='secondary' to='/'>
      {location}
    </Link>
  );
};

export default memo(Location);
