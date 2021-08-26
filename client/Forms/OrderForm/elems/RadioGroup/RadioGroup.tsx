import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Radio, { RadioProps } from '@UI/Radio';
import styles from './RadioGroup.module.css';

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  name?: string;
  items: RadioProps[];
}

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const { className, name, items, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.group, className)}>
      {items.map((item, index) => (
        <Radio className={styles.item} {...item} name={name} key={index} />
      ))}
    </div>
  );
};

export default memo(RadioGroup);
