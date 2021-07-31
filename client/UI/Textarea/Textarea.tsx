import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Textarea.module.css';

export type EpicTextareaRef = HTMLTextAreaElement;

export interface EpicTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  wide?: boolean;
  error?: string;
  value?: string;
  name?: string;
}

const EpicTextarea = forwardRef<EpicTextareaRef, EpicTextareaProps>((props, ref) => {
  const { className, wide, placeholder, error, disabled, ...restProps } = props;

  return (
    <>
      <textarea
        {...restProps}
        className={cn(
          styles.textarea,
          {
            [styles.wide]: wide,
            [styles.disabled]: disabled,
            [styles.errored]: !!error,
          },
          [className],
        )}
        ref={ref}
        placeholder={placeholder}
        readOnly={disabled}
      />
      {error && <div className={styles.error}>{error}</div>}
    </>
  );
});

EpicTextarea.displayName = 'EpicTextarea';

export default EpicTextarea;
