import React, { FC, HTMLAttributes, memo, useMemo, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Link from '@UI/Link';
import styles from './ContactWithQualityDep.module.css';

export interface ContactWithQualityDepProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ContactWithQualityDep: FC<ContactWithQualityDepProps> = (props) => {
  const { className, feedbackLink, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.contactWithQualityDep, className)}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.title}>Обращение в отдел качества</div>

          <div className={styles.text}>
            Воспользуйтесь формой обратной связи для осуществления возврата или обмена, а также при
            наступлении гарантийного случая.
          </div>

          <Link className={styles.link} to={feedbackLink} view='simple'>
            <Button className={styles.button} size='l' theme='primary' view='main'>
              Написать нам
            </Button>
          </Link>

          <div className={styles.nuans}>* Предложение не является публичной офертой.</div>
        </div>
      </div>
    </div>
  );
};

export default memo(ContactWithQualityDep);
