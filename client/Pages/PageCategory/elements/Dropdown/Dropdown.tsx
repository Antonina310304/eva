import React, {
  cloneElement,
  FC,
  HTMLAttributes,
  memo,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import cn from 'classnames';

import styles from './Dropdown.module.css';

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
  children?: ReactElement;
}

const Dropdown: FC<DropdownProps> = (props) => {
  const { className, label, children, ...restProps } = props;
  const [visible, setVisible] = useState(false);

  const handleClickLabel = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <div {...restProps} className={cn(styles.dropdown, { [styles.visible]: visible }, className)}>
      <div className={styles.containerLabel} onClick={handleClickLabel}>
        <span className={styles.label}>{label}</span>
        <div className={styles.arrow} />
      </div>

      {children &&
        cloneElement(children, {
          ...children.props,
          visible,
          className: cn(children.props.className, styles.popup),
          onClose: handleClose,
        })}
    </div>
  );
};

export default memo(Dropdown);
