import {
  cloneElement,
  FC,
  HTMLAttributes,
  MouseEvent,
  memo,
  ReactElement,
  Suspense,
  useCallback,
  useState,
  useEffect,
} from 'react';
import cn from 'classnames';

import styles from './Dropdown.module.css';

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
  children?: ReactElement;
  opened?: boolean;
  onOpen?: (e: MouseEvent) => void;
}

const Dropdown: FC<DropdownProps> = (props) => {
  const { className, label, children, opened, onOpen, ...restProps } = props;
  const [visible, setVisible] = useState(false);

  const handleClickLabel = useCallback(
    (e) => {
      if (onOpen && !visible) onOpen(e);
      setVisible((prev) => !prev);
    },
    [onOpen, visible],
  );

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    setVisible(opened);
  }, [opened]);

  return (
    <div {...restProps} className={cn(styles.dropdown, { [styles.visible]: visible }, className)}>
      <div className={styles.containerLabel} onClick={handleClickLabel}>
        <span className={styles.label}>{label}</span>
        <div className={styles.arrow} />
      </div>

      {children && visible && (
        <Suspense fallback={null}>
          {cloneElement(children, {
            ...children.props,
            visible,
            className: cn(children.props.className, styles.popup),
            onClose: handleClose,
          })}
        </Suspense>
      )}
    </div>
  );
};

export default memo(Dropdown);
