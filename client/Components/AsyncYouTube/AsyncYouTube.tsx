import React, { useCallback, memo } from 'react';

// import Heading from '@divanru/ts-ui/Heading';
// import IconClose from '@divanru/ts-ui/IconClose';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import KeyboardHandler from '@Components/KeyboardHandler';
import '../Modal/Modal.module.css';

const b = cn('Modal');

const Modal = ({
  className,
  id,
  needClose = true,
  view = 'default',
  visible,
  children,
  onClose,
  outsideClick = true,
  theme,
  title,
}) => {
  const { animatings } = useModals();

  //
  const handleClose = useCallback(
    (e) => {
      if (visible && onClose) onClose(e);
    },
    [visible, onClose],
  );

  //
  const handleBlockClose = useCallback(
    (e) => {
      if (
        outsideClick &&
        (e.target.classList.contains('Modal') || e.target.classList.contains('Modal-Wrapper'))
      ) {
        handleClose(e);
      }
    },
    [handleClose, outsideClick],
  );

  return (
    <KeyboardHandler onEscape={onClose}>
      <div
        className={b({ view, theme, closes: animatings.includes(id) }, [className])}
        onClick={handleBlockClose}
      >
        <div className={b('Wrapper')}>
          <div className={b('WrapperContent')}>
            <div className={b('Content')}>
              {title && (
                <h1 className={b('Title')} size='m'>
                  {title}
                </h1>
              )}
              {children}
            </div>
            {needClose && (
              <div className={b('Close', { theme })} onClick={handleClose}>
                {/* <IconClose
                  className={b('CloseIcon', {
                    inverse: ['default-outside', 'responsive-outside'].includes(view),
                  })} /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </KeyboardHandler>
  );
};

export default memo(Modal);
