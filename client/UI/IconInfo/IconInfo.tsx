import React, { FC, HTMLAttributes, memo, useCallback, MouseEvent } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import styles from './IconInfo.module.css';

import Icon from './icon.svg';
import IconActive from './icon_active.svg';

export interface State {
  active: boolean;
}

export interface IconInfoProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  active?: boolean;
  onClickIcon?: (e: MouseEvent, state: State) => void;
}

const IconInfo: FC<IconInfoProps> = (props) => {
  const { className, active, onClickIcon, ...restProps } = props;

  const handleClick = useCallback(
    (e) => {
      if (onClickIcon) onClickIcon(e, { active: !active });
    },
    [active, onClickIcon],
  );

  return (
    <Image
      {...restProps}
      className={cn(styles.icon, { [styles.active]: active }, className)}
      onClick={handleClick}
      src={active ? IconActive : Icon}
    />
  );
};

export default memo(IconInfo);
