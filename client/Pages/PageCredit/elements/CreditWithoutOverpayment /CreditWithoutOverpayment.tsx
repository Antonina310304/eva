import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ParagraphTitle from '../ParagraphTitle';
import { Installment } from '../../typings';
import styles from './CreditWithoutOverpayment.module.css';

export interface CreditWithoutOverpaymentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  installment: Installment;
}

const CreditWithoutOverpayment: FC<CreditWithoutOverpaymentProps> = (props) => {
  const { className, installment, ...restProps } = props;
  const { list, note, title } = installment;

  return (
    <div {...restProps} className={cn(styles.creditWithoutOverpayment, className)}>
      <ParagraphTitle title={title} />

      <ul className={styles.list}>
        {list.map((item, index) => (
          <li
            className={styles.listItem}
            key={index}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </ul>

      <div className={styles.nuance}>{note}</div>
    </div>
  );
};

export default memo(CreditWithoutOverpayment);
