import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import Divider from '@Pages/PageCredit/elements/Divider';
import Wrapper from '@Pages/PageCredit/elements/Wrapper';
import PageTitle from '@Pages/PageCredit/elements/PageTitle';
import QualityDepartment from './elements/QualityDepartment';
import Requisites from './elements/Requisites';
import ButtonsContactForms from './elements/ButtonsContactForms';
import SeeUs from './elements/SeeUs';
import { PageContactsData } from './typings';
import styles from './PageContacts.module.css';

export interface PageContactsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageContactsData;
  meta: MetaData;
}

const PageContacts: FC<PageContactsProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { title, organization, forms, map, sellPoints } = page;

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

  console.log('page', page);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <PageTitle className={styles.pageTitle} title={title} />

      <Wrapper>
        <div className={styles.hotLineWrapper}>
          <div className={styles.callIcon} />
          <div className={styles.hotContainer}>
            <div className={styles.hotLine}>{organization.phones.label}</div>
            <div className={styles.hotNumber}>{organization.phones.values[0]}</div>
          </div>
        </div>

        <div className={styles.hotInfo}>
          Партнерский пункт выдачи заказов: 600032, г. Владимир, ул. Растопчина, д. 24а, ТЦ
          «Меридиан», 2 этаж
        </div>

        <QualityDepartment schedule={schedule} />

        <Requisites className={styles.requisites} requisites={organization} />

        <ButtonsContactForms className={styles.buttonsContactForms} data={forms} />
      </Wrapper>

      <Wrapper type='wide'>
        <Divider className={styles.divider} />

        <SeeUs className={styles.seeUs} data={map} pickupPoints={sellPoints} />
      </Wrapper>
    </div>
  );
};

export default memo(PageContacts);
