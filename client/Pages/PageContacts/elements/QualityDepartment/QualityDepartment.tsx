import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { Schedule } from '@Pages/PageWarranty/typings';
import styles from './QualityDepartment.module.css';

export interface QualityDepartmentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  schedule: Schedule[];
}

const QualityDepartment: FC<QualityDepartmentProps> = (props) => {
  const { className, schedule, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.qualityDepartment, className)}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.mainTitle}>Отдел качества</div>
        </div>

        <div className={styles.body}>
          {schedule.map((item, index: number) => (
            <div className={styles.item} key={index}>
              <div
                className={cn(styles.icon, {
                  [styles.telephone]: item.type === 'tel',
                  [styles.clock]: item.type === 'text',
                  [styles.mail]: item.type === 'mail',
                })}
              />
              <div className={styles.info}>
                <div className={styles.itemTitle}>{item.name}</div>
                <div className={styles.itemValue}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(QualityDepartment);
