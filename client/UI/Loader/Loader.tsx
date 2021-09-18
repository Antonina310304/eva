import { memo, HTMLAttributes, FC } from 'react';
import cn from 'classnames';

import styles from './Loader.module.css';

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Loader: FC<LoaderProps> = ({ className, ...restProps }) => {
  return <div {...restProps} className={cn(styles.loader, className)} />;
};

export default memo(Loader);
