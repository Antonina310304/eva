import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import styles from './FeedbackPanel.module.css';

export interface FeedbackPanelProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FeedbackPanel: FC<FeedbackPanelProps> = (props) => {
  const { className, ...restProps } = props;

  const handleClick = useCallback(() => {}, []);

  return (
    <div {...restProps} className={cn(styles.panel, className)}>
      <div className={styles.container}>
        <div className={styles.title}>Связаться с нами</div>
        <div className={styles.text}>
          По всем вопросам, связанным с прессой, обращайтесь press@divan.ru или воспользуйтесь
          формой обратной связи*
        </div>
        <Button className={styles.button} onClick={handleClick}>
          Написать нам
        </Button>
        <div className={styles.warning}>* Предложение не является публичной офертой.</div>
      </div>
    </div>
  );
};

export default memo(FeedbackPanel);
