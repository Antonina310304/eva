import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './ProgressBar.module.css';

export interface Track {
  width: number;
  offset: number;
}

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  track: Track;
}

const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { className, track, ...restProps } = props;

  const dieStyles = track
    ? {
        width: `${track.width}%`,
        left: `${track.offset}%`,
      }
    : {};

  return (
    <div {...restProps} className={cn(styles.progress, { [styles.invisible]: !track }, className)}>
      <div className={styles.die} style={dieStyles} />
    </div>
  );
};

export default memo(ProgressBar);
