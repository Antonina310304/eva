import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './PageError.module.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageError: FC<Props> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.pageError, [className])}>
      Error
    </div>
  );
};

export default memo(PageError);
