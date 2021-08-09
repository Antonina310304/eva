import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import useOnClickOutside from '@Hooks/useOnClickOutside';
import Image from '@UI/Image';
import IconInfo from '@UI/IconInfo';
import PopoverInfo from '@Components/PopoverInfo';
import styles from './Hardness.module.css';

export interface HardnessProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  icon: string;
  name: string;
  value: string;
  description: string[];
}

const Hardness: FC<HardnessProps> = (props) => {
  const { className, icon, name, value, description, ...restProps } = props;
  const [visible, setVisible] = useState(false);

  const handleClick = useCallback((e, state) => {
    setVisible(state.active);
  }, []);

  const handleHidePopover = useCallback(() => {
    setVisible(false);
  }, []);

  const refPopover = useOnClickOutside(handleHidePopover, !visible);

  return (
    <div {...restProps} className={cn(styles.hardness, className)}>
      <div className={styles.name}>{name}</div>
      <div className={styles.value}>
        {icon && <Image className={styles.icon} src={icon} />}
        <span className={styles.text}>{value}</span>
        {description?.length > 0 && (
          <IconInfo className={styles.info} active={visible} onClickIcon={handleClick} />
        )}
      </div>

      {description?.length > 0 && visible && (
        <div className={styles.popoverInfo} ref={refPopover}>
          <PopoverInfo description={description} visibility={visible} />
        </div>
      )}
    </div>
  );
};

export default memo(Hardness);
