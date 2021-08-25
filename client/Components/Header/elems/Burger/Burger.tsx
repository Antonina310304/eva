import React, { FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import styles from './Burger.module.css';

export interface BurgerProps extends HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
  className?: string;
}

const Burger: FC<BurgerProps> = ({ onClick, className }) => {
  return <button type='button' className={cn(styles.burger, className)} onClick={onClick} />;
};

export default Burger;
