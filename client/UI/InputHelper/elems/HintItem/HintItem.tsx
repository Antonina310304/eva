import React, { FC, HTMLAttributes, useCallback, MouseEvent } from 'react';
import cn from 'classnames';

import { InputHelperHint } from '../../InputHelper';
import styles from './HintItem.module.css';

export type HintItemCallback = (e: MouseEvent, item: InputHelperHint) => void;

export interface HintItemProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  selected?: boolean;
  item: InputHelperHint;
  onClick?: (e: MouseEvent) => void;
  onCheck?: HintItemCallback;
}

const HintItem: FC<HintItemProps> = (props: HintItemProps) => {
  const { className, item, selected, children, onClick, onCheck, ...restProps } = props;

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (onClick) onClick(e);
      if (onCheck) onCheck(e, item);
    },
    [item, onCheck, onClick],
  );

  return (
    <div
      {...restProps}
      className={cn(styles.hintItem, { [styles.selected]: selected }, className)}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default HintItem;
