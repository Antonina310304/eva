import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './ConditionsToBuyInCredit.module.css';

export interface ConditionsToBuyInCreditProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ConditionsToBuyInCredit: FC<ConditionsToBuyInCreditProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.conditionsToBuyInCredit, className)}>
      <div className={styles.title}>Что нужно для покупки в кредит без переплаты?</div>

      <div className={styles.wrapper}>
        <div className={styles.condition}>
          <div className={cn(styles.icon, styles.card)} />
          <div className={styles.text}>Действующая дебетовая карта Сбербанка</div>
        </div>

        <div className={styles.condition}>
          <div className={cn(styles.icon, styles.online)} />
          <div className={styles.text}>Сбербанк Онлайн и Мобильный банк</div>
        </div>

        <div className={styles.condition}>
          <div className={cn(styles.icon, styles.passport)} />
          <div className={styles.text}>Паспорт гражданина РФ</div>
        </div>
      </div>
    </div>
  );
};

export default memo(ConditionsToBuyInCredit);
