import React, { FC, FormEvent, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Radio, { RadioProps } from '@UI/Radio';
import styles from './RadioGroup.module.css';

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  className?: string;
  name?: string;
  items: RadioProps[];
  onChange?: (e: FormEvent, item: RadioProps) => void;
}

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const { className, name, items, onChange, ...restProps } = props;
  const [, setCheckedItem] = useState(() => {
    return items.find((item) => item.defaultChecked || item.checked);
  });

  const handleChange = useCallback(
    (e: FormEvent, item) => {
      setCheckedItem(item);
      if (onChange) onChange(e, item);
    },
    [onChange],
  );

  return (
    <div {...restProps} className={cn(styles.group, className)}>
      {items.map((item, index) => (
        <Radio
          className={styles.item}
          {...item}
          name={name}
          key={index}
          onChange={(e) => handleChange(e, item)}
        />
      ))}
    </div>
  );
};

export default memo(RadioGroup);
