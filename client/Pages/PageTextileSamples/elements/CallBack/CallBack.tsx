import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import useModals from '@Hooks/useModals';
import styles from './CallBack.module.css';

export interface CallBackProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CallBack: FC<CallBackProps> = (props) => {
  const { className, ...restProps } = props;
  const [, { openModal }] = useModals();

  const handleClickCallBack = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  return (
    <div {...restProps} className={cn(styles.callBack, className)}>
      <div className={styles.title}>Остались вопросы? Закажите обратный звонок</div>

      <div className={styles.text}>
        Мы сами вам перезвоним и ответим на все вопросы о заказе бесплатных образцов тканей.
      </div>

      <Button onClick={handleClickCallBack} theme='blank' className={styles.button}>
        Заказать обратный звонок
      </Button>

      <div className={styles.nuance}>* Предложение не является публичной офертой.</div>
    </div>
  );
};

export default memo(CallBack);
