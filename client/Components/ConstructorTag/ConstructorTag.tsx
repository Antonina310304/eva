import { memo, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';

import styles from './ConstructorTag.module.css';

export interface ConstructorTagProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: 's' | 'm';
  view?: 'gray' | 'white';
  expanded?: boolean;
  title: string;
  icon: string;
}

const ConstructorTag: FC<ConstructorTagProps> = (props) => {
  const { className, view, title, expanded, icon, size, onClick, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(
        styles.constructorTag,
        {
          [styles.expanded]: expanded,
          [styles.gray]: view === 'gray',
          [styles.white]: view === 'white',
          [styles.s]: size === 's',
          [styles.m]: size === 'm',
        },
        className,
      )}
      title={size === 's' ? title : ''}
    >
      <Image className={styles.image} src={icon} />
      {expanded && <div className={styles.title}>{title}</div>}
    </div>
  );
};

ConstructorTag.defaultProps = {
  size: 's',
  view: 'gray',
};

export default memo(ConstructorTag);
