import { FC, HTMLAttributes, memo, useState, useCallback, useRef, useEffect } from 'react';
import loadable from '@loadable/component';
import cn from 'classnames';

import useOnClickOutside from '@Hooks/useOnClickOutside';
import useMedias from '@Hooks/useMedias';
import { ImportantParameter } from '@Pages/PageProduct/typings';
import styles from './StringParameter.module.css';

export interface StringParameterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  name: string;
  value: string;
  importantParameter?: ImportantParameter;
}

const MechanismPopup = loadable(() => import('../MechanismPopup'));

const StringParameter: FC<StringParameterProps> = (props) => {
  const { className, name, value, importantParameter, ...restProps } = props;
  const [visible, setVisible] = useState(false);
  const [positionPopup, setPositionPopup] = useState({ transform: 'none' });
  const { isDesktop } = useMedias();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickValue = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const refPopup = useOnClickOutside(handleClose, !visible);

  useEffect(() => {
    if (!ref.current) return;

    if (isDesktop) {
      setPositionPopup({ transform: 'none' });
      return;
    }

    const rect = ref.current.getBoundingClientRect();

    setPositionPopup({
      transform: `translateX(-${Math.round(rect.width / 2)}px)`,
    });
  }, [isDesktop]);

  return (
    <div
      {...restProps}
      className={cn(
        styles.parameter,
        {
          [styles.clickable]: !!importantParameter,
        },
        className,
      )}
      ref={ref}
    >
      <span className={styles.name}>{`${name}: `}</span>
      <span className={styles.value} onClick={handleClickValue}>
        {value}
      </span>

      {importantParameter && (
        <MechanismPopup
          ref={refPopup}
          visible={visible}
          parameter={importantParameter}
          style={positionPopup}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default memo(StringParameter);
