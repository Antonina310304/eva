import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import cn from 'classnames';

import styles from './MobileNavContainer.module.css';

export interface MobileNavContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

const MobileNavContainer: FC<MobileNavContainerProps> = ({ children, className }) => {
  return <div className={cn(className, styles.container)}>{children}</div>;
};

export default memo(MobileNavContainer);
