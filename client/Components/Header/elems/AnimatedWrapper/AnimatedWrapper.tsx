import React, { FC, HTMLAttributes, Ref, useRef } from 'react';
import cn from 'classnames';

import styles from './AnimatedWrapper.module.css';

export interface AnimatedWrapperProps extends HTMLAttributes<HTMLDivElement> {
  classMame?: string;
  isShowSubMenu: boolean;
  children: (arg: Ref<HTMLDivElement>) => React.ReactNode;
}
const AnimatedWrapper: FC<AnimatedWrapperProps> = ({ isShowSubMenu, className, children }) => {
  const wrapperRef = useRef<HTMLInputElement>();

  return (
    <div className={cn(styles.wrapper, { [styles.isShowSubMenu]: isShowSubMenu }, className)}>
      {children(wrapperRef)}
    </div>
  );
};

export default AnimatedWrapper;
