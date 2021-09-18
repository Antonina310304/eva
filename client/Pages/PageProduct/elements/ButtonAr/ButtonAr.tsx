import { FC, HTMLAttributes, memo, MouseEvent, useState, useEffect } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import useMedias from '@Hooks/useMedias';
import { AR } from '@Types/AR';

import ModelViewer from '../ModelViewer';

import styles from './ButtonAr.module.css';

export interface ButtonArProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  actived?: boolean;
  ar?: AR;
  expanded?: boolean;
  hiddenPopup?: boolean;
  onLoading?: (e: MouseEvent) => void;
}

const ButtonAr: FC<ButtonArProps> = (props) => {
  const { className, ar, onLoading, ...restProps } = props;
  const [visibled, setVisibled] = useState(false);
  const { isDesktop } = useMedias();

  useEffect(() => setVisibled(true), []);

  return (
    <div
      {...restProps}
      className={cn(styles.buttonAr, { [styles.visibled]: visibled }, [className])}
    >
      <ModelViewer ar={ar} className={styles.modelViewer} onLoading={onLoading}>
        <Button className={styles.button} theme='dirty' view={isDesktop ? 'circle' : 'main'}>
          <div className={styles.icon} />
          {!isDesktop && <div className={styles.buttonText}>Примерить в комнате</div>}
        </Button>
      </ModelViewer>
    </div>
  );
};

export default memo(ButtonAr);
