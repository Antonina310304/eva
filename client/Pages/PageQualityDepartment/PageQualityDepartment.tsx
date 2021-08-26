import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Wrapper from '@Pages/PageCredit/elements/Wrapper';
import PageTitle from '@Pages/PageCredit/elements/PageTitle';
import QualityDepartment from '@Pages/PageContacts/elements/QualityDepartment';
import QualityDepartmentForm from './QualityDepartmentForm';
import { PageQualityDepartmentData } from './typings';
import styles from './PageQualityDepartment.module.css';

export interface PageQualityDepartmentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: Типизируй меня полностью
  page: PageQualityDepartmentData;
}

const PageQualityDepartment: FC<PageQualityDepartmentProps> = (props) => {
  const { className, page, ...restProps } = props;

  // TODO убрать, когда будет получено соответствующее свойство от бэка
  const schedule = [
    {
      name: 'Режим работы',
      value: 'пн.-пт. с 09:00 до 18:00',
      type: 'text',
    },
    {
      name: 'Электронная почта',
      value: 'ok@divan.by',
      type: 'mail',
    },
    {
      name: 'Телефон',
      value: '+7 (495) 710-99-99',
      type: 'tel',
    },
  ];

  return (
    <div {...restProps} className={cn(styles.pageQualityDepartment, className)}>
      <Wrapper>
        <PageTitle className={styles.pageTitle} title='Обращение в отдел качества' />

        <div className={styles.text}>
          Мы ответственно несем взятые на себя гарантийные обязательства перед покупателями. Если у
          вас появились вопросы или возникли проблемы, связанные с заказом, напишите нам: заполните
          форму обращения, прикрепите фото или видео. Полная информация поможет нам разобраться в
          ситуации в кратчайшие сроки.
        </div>

        <QualityDepartment className={styles.qualityDepartment} schedule={schedule} />

        <QualityDepartmentForm className={styles.qualityDepartmentForm} />
      </Wrapper>
    </div>
  );
};

export default memo(PageQualityDepartment);
