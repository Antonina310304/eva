import React, { FC, HTMLAttributes, MouseEvent, memo, useEffect, useCallback } from 'react';
import cn from 'classnames';

import Popup from '@UI/Popup';
import useMedias from '@Hooks/useMedias';
import useModals from '@Hooks/useModals';
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

const modalId = 'MobileOptions';
const OptionsPopup: FC<OptionsPopupProps> = (props) => {
  const { className, label, options, visible, onCheckOption, onClose, ...restProps } = props;
  const { isMobile } = useMedias();
  const [, { openModal, closeModal }] = useModals();
  const ref = useOnClickOutside(onClose, !visible);

  const handleCheckOption = useCallback(
    (e: MouseEvent, option: OptionData) => {
      if (onCheckOption) onCheckOption(e, option);
      if (onClose) onClose(e);
    },
    [onCheckOption, onClose],
  );

  useEffect(() => {
    if (!isMobile || !visible) {
      closeModal(modalId);
      return;
    }

    openModal(modalId, { label, options, onCheckOption, onClose });
  }, [closeModal, isMobile, label, onCheckOption, onClose, openModal, options, visible]);

  return !isMobile ? (
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
  ) : null;
};

export default memo(OptionsPopup);
