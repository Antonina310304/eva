import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import Button from '@UI/Button';
import styles from './Ideas.module.css';

export interface IdeasProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
}
const Ideas: FC<IdeasProps> = ({ className, title }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <p className={styles.title}>{title || 'Идеи для дома'}</p>
      <p>Табы</p>
      <p>слайдер</p>
      <Button>Показать еще идеи</Button>
    </div>
  );
};

export default Ideas;
