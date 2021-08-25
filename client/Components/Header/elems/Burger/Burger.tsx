import React, { FC, HTMLAttributes } from 'react';

export interface BurgerProps extends HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
}

const Burger: FC<BurgerProps> = ({ onClick }) => {
  return <div onClick={onClick}>бургер</div>;
};

export default Burger;
