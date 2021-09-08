import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import Divider from '@Pages/PageCredit/elements/Divider';
import ServicePageTitle from '@Components/ServicePageTitle';
import SectionShowroomsMap from '@Components/SectionShowroomsMap';
import QualityDepartment from './elements/QualityDepartment';
import Requisites from './elements/Requisites';
import ButtonsContactForms from './elements/ButtonsContactForms';
import { PageContactsData } from './typings';
import styles from './PageContacts.module.css';

export interface PageContactsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageContactsData;
  meta: MetaData;
}

const PageContacts: FC<PageContactsProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { title, organization, forms, map, sellPoints, pickUpPoints } = page;

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
    <div {...restProps} className={cn(styles.page, className)}>
      <ServicePageTitle className={styles.pageTitle} title={title} />

      <div className={styles.containerNarrow}>
        <div className={styles.hotLineWrapper}>
          <div className={styles.callIconWrapper}>
            <div className={styles.callIcon} />
          </div>
          <div className={styles.hotContainer}>
            <div className={styles.hotLine}>{organization.phones.label}</div>
            <div className={styles.hotNumber}>{organization.phones.values[0]}</div>
          </div>
        </div>

        <div className={styles.hotInfoWrapper}>
          {pickUpPoints.length > 0 && (
            <ul className={styles.list}>
              Партнерские пункты выдачи заказов:
              {pickUpPoints.map((pickUpPoint, index) => (
                <li className={styles.listItem} key={index}>
                  {`${pickUpPoint.address.postalCode}, ${pickUpPoint.address.addressLocality}, ${pickUpPoint.address.streetAddress}`}
                  {pickUpPoint.address.additional !== '' && `, ${pickUpPoint.address.additional}`}
                </li>
              ))}
            </ul>
          )}
          {pickUpPoints.length === 0 && (
            <div>
              {`Партнерский пункт выдачи заказов: ${pickUpPoints[0].address.postalCode}, ${pickUpPoints[0].address.addressLocality}, ${pickUpPoints[0].address.streetAddress}`}
              {pickUpPoints[0].address.additional !== '' &&
                `, ${pickUpPoints[0].address.additional}`}
            </div>
          )}
        </div>

        <QualityDepartment schedule={schedule} />

        <Requisites className={styles.requisites} requisites={organization} />

        <ButtonsContactForms className={styles.buttonsContactForms} contactDatas={forms} />
      </div>

      <div className={styles.containerSeeUs}>
        <Divider className={styles.divider} />
        <SectionShowroomsMap className={styles.seeUs} datasForMap={map} pickupPoints={sellPoints} />
      </div>
    </div>
  );
};

export default memo(PageContacts);
