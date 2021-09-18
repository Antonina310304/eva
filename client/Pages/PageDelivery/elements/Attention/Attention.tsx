import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import styles from './Attention.module.css';

import Icon from './icon.svg';

export interface AttentionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  text: string;
}

const Attention: FC<AttentionProps> = (props) => {
  const { className, text, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.attention, className)}>
      <Image src={Icon} className={styles.icon} />
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default memo(Attention);
