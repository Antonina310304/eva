import { FC, HTMLAttributes, Suspense, memo, useCallback, lazy, useState } from 'react';
import cn from 'classnames';

import useOnClickOutside from '@Hooks/useOnClickOutside';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import { PinData } from '@Types/Ideas';
import styles from './Pin.module.css';

export interface PinProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  className?: string;
  pin: PinData;
  onClick?: (e: MouseEvent, pin: PinData) => void;
}

const IdeasPopup = lazy(() => import('../IdeasPopup'));

const Pin: FC<PinProps> = (props) => {
  const { className, pin, ...restProps } = props;
  const [visible, setVisible] = useState(false);
  const [, { openModal }] = useModals();
  const { isMobile } = useMedias();
  const [left, top] = pin.coords;

  const handleClick = useCallback(() => {
    if (isMobile) {
      openModal('Idea', { product: pin.product });
    }

    setVisible((prev) => !prev);
  }, [isMobile, openModal, pin.product]);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const refPopup = useOnClickOutside(handleClose, !visible);

  return (
    <div className={cn(styles.wrapper, className)} style={{ top: `${top}%`, left: `${left}%` }}>
      <div {...restProps} className={styles.pin} onClick={handleClick} />

      {visible && !isMobile && (
        <Suspense fallback={null}>
          <IdeasPopup
            className={styles.popup}
            product={pin.product}
            ref={refPopup}
            onClose={handleClose}
          />
        </Suspense>
      )}
    </div>
  );
};

export default memo(Pin);
