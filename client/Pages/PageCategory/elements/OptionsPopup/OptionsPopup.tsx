import React, { FC, HTMLAttributes, MouseEvent, memo, useCallback } from 'react';
import cn from 'classnames';

import Popup from '@UI/Popup';
import useOnClickOutside from '@Hooks/useOnClickOutside';
import styles from './OptionsPopup.module.css';

export interface OptionData {
  id: string;
  name: string;
  selected?: boolean;
}

export interface OptionsPopupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
  options: OptionData[];
  visible?: boolean;
  onCheckOption?: (e: MouseEvent, option: OptionData) => void;
  onClose?: (e: MouseEvent) => void;
}

const OptionsPopup: FC<OptionsPopupProps> = (props) => {
  const { className, label, options, visible, onCheckOption, onClose, ...restProps } = props;
  const ref = useOnClickOutside(onClose, !visible);

  const handleCheckOption = useCallback(
    (e: MouseEvent, option: OptionData) => {
      if (onCheckOption) onCheckOption(e, option);
      if (onClose) onClose(e);
    },
    [onCheckOption, onClose],
  );

  return (
    <Popup
      {...restProps}
      className={cn(styles.popup, { [styles.visible]: visible }, className)}
      visible={visible}
      ref={ref}
    >
      <div className={styles.containerLabel} onClick={onClose}>
        <span className={styles.label}>{label}</span>
        <div className={styles.arrow} />
      </div>

      <div className={styles.options}>
        {options.map((option) => (
          <div
            className={cn(styles.option, { [styles.selected]: option.selected })}
            key={option.id}
            onClick={(e) => handleCheckOption(e, option)}
          >
            {option.name}
          </div>
        ))}
      </div>
    </Popup>
  );
};

export default memo(OptionsPopup);
