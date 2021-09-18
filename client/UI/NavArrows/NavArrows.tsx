import { FC, HTMLAttributes, memo, MouseEvent } from 'react';
import cn from 'classnames';

import styles from './NavArrows.module.css';

export interface ArrowsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onPrev?: (e: MouseEvent) => void;
  onNext?: (e: MouseEvent) => void;
}

const Arrows: FC<ArrowsProps> = (props) => {
  const { className, onPrev, onNext, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.arrows, className)}>
      <div className={cn(styles.arrow, { [styles.prev]: true })} onClick={onPrev} />
      <div className={cn(styles.arrow, { [styles.next]: true })} onClick={onNext} />
    </div>
  );
};

export default memo(Arrows);
