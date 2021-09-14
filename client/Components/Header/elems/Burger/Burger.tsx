import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Burger.module.css';

export interface BurgerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Burger: FC<BurgerProps> = (props) => {
  const { className, ...restProps } = props;

  return <button {...restProps} type='button' className={cn(styles.burger, className)} />;
};

export default Burger;
