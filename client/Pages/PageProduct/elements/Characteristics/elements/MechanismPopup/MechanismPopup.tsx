import React, { useState, useCallback, memo, HTMLAttributes, MouseEvent, forwardRef } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Popup from '@UI/Popup';
import IconClose from '@UI/IconClose';
import { ImportantParameter } from '@Pages/PageProduct/typings';
import styles from './MechanismPopup.module.css';

export interface MechanismPopupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  visible?: boolean;
  parameter?: ImportantParameter;
  onClose?: (e: MouseEvent) => void;
}

const MechanismPopup = forwardRef<HTMLDivElement, MechanismPopupProps>((props, ref) => {
  const { visible, parameter, className, onClose, ...restProps } = props;
  const [currentSrc, setCurrentSrc] = useState<string>(parameter.preview);

  const handleMouseEnterImage = useCallback(() => {
    if (!parameter.image) return;

    setCurrentSrc(parameter.image);
  }, [parameter]);

  const handleMouseLeaveImage = useCallback(() => {
    if (!parameter.image) return;

    setCurrentSrc(parameter.preview);
  }, [parameter]);

  return (
    <Popup {...restProps} ref={ref} className={cn(styles.popup, className)} visible={visible}>
      <div className={styles.container}>
        <IconClose className={styles.iconClose} view='default' size='s' onClick={onClose} />

        <Image
          src={currentSrc}
          className={styles.img}
          onMouseEnter={handleMouseEnterImage}
          onMouseLeave={handleMouseLeaveImage}
        >
          {parameter.image && <div className={styles.iconPlay} />}
        </Image>

        <div className={styles.content}>
          <div className={styles.title}>{parameter.title}</div>
          <div
            className={styles.text}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: parameter.text }}
          />
        </div>
      </div>
    </Popup>
  );
});

export default memo(MechanismPopup);
