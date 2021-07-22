import React, { FC, HTMLAttributes, memo, MouseEvent } from 'react';
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
  const { className, ar, actived, expanded, onLoading, hiddenPopup, ...restProps } = props;
  const { isDesktop } = useMedias();

  return (
    <div {...restProps} className={cn(styles.buttonAr, [className])}>
      <ModelViewer ar={ar} className={styles.modelViewer} onLoading={onLoading}>
        {isDesktop ? (
          <Button className={styles.button} theme='dirty' view='rounded'>
            <div className={styles.icon} />
          </Button>
        ) : (
          <Button className={styles.button} theme='dirty'>
            <div className={styles.icon} />
            <div className={styles.buttonText}>Примерить в комнате</div>
          </Button>
        )}
      </ModelViewer>
    </div>
  );
};

export default memo(ButtonAr);
