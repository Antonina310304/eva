import React, { memo, InputHTMLAttributes, FC, useState, useCallback, useEffect } from 'react';
import cn from 'classnames';

import styles from './Switch.module.css';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Switch: FC<SwitchProps> = (props: SwitchProps) => {
  const { className, defaultChecked, checked, name, ...restProps } = props;
  const [actived, setActived] = useState(defaultChecked || checked || false);

  const handleClick = useCallback(() => {
    setActived((prev) => !prev);
  }, []);

  useEffect(() => {
    setActived(checked);
  }, [checked]);

  return (
    <div
      className={cn(styles.switch, { [styles.actived]: actived }, className)}
      onClick={handleClick}
    >
      <input
        {...restProps}
        className={styles.control}
        type='checkbox'
        name={name}
        checked={actived}
      />
    </div>
  );
};

export default memo(Switch);
