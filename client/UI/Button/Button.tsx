/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, FC, memo } from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

export interface SizesProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  wide?: boolean;
}

const Button: FC<SizesProps> = (props) => {
  const { className, wide, type = 'button', title, ...restProps } = props;

  return (
    <button
      {...restProps}
      className={cn(styles.button, { [styles.wide]: wide }, className)}
      type={type}
    >
      {title}
    </button>
  );
};

export default memo(Button);
