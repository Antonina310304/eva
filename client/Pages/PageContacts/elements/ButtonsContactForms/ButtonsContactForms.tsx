import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import styles from './ButtonsContactForms.module.css';

export interface ButtonsContactFormsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ButtonsContactForms: FC<ButtonsContactFormsProps> = (props) => {
  const { className, data, ...restProps } = props;
  const { items, text, title } = data;

  return (
    <div {...restProps} className={cn(styles.buttonsContactForms, className)}>
      <div className={styles.title}>{title}</div>

      <div className={styles.textWrapper}>
        {text.map((paragraph, index) => (
          <div className={styles.paragraph} key={index}>
            {paragraph}
          </div>
        ))}
      </div>

      <div className={styles.buttonsWrapper}>
        {items.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.itemTitle}>{item.title}</div>
            <Button className={styles.button} theme='blank'>
              {item.text}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ButtonsContactForms);
