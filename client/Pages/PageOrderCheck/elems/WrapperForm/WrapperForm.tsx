import { FC, HTMLAttributes, ReactChild, memo } from 'react';
import cn from 'classnames';

import styles from './WrapperForm.module.css';

export interface WrapperFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  head: ReactChild;
}

const WrapperForm: FC<WrapperFormProps> = (props) => {
  const { className, head, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      {head}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default memo(WrapperForm);
