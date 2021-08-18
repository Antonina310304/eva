import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import Anchors from '@Components/Anchors';
import styles from './PagePaymentBlr.module.css';
import PaymentOptions from './elements/PaymentOptionsBlr';
import PayOnline from './elements/PayOnline';

export interface PagePaymentBlrProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PagePaymentBlr: FC<PagePaymentBlrProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  const { teaserText, pageMenu, paymentTypes } = page;
  const payments = paymentTypes.slice(3, 10);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.heading}>Способы оплаты</h1>
      <Anchors anchors={pageMenu} />
      <div className={styles.wrapper}>
        <div className={styles.introduction}>{teaserText}</div>
        <PaymentOptions />
        <div className={styles.information}>
          Для совершения оплаты заказа принимаются карточки международных систем VISA (всех видов),
          MasterCard (в том числе Maestro), эмитированные любым банком мира, а также карты системы
          БЕЛКАРТ.
        </div>
        <img className={styles.pic} src='/react/static/img/paymentBlr/logos.jpg' />
        <p className={styles.text}>Никаких комиссий и дополнительных платежей не взимается!</p>
        <PayOnline />
        <ul className={styles.list}>
          {payments.map((item, index) => (
            <li className={styles.item} key={index}>
              <div className={styles.headingWrapper}>
                <img className={styles.paymentImage} src={`/react/static${item.icon}`} />
                <h3 className={styles.paymentHeading}>{item.name}</h3>
              </div>
              <div dangerouslySetInnerHTML={{ __html: `${item.description}` }} />
            </li>
          ))}
        </ul>
        <div className={styles.headingWrapper}>
          <img className={styles.paymentImage} src='/react/static/svg/icons/erip.svg' />
          <h3 className={styles.paymentHeading}>Система «Расчет» (ЕРИП)</h3>
        </div>
        <p className={styles.text}>
          Оплатить заказ Вы можете через систему «Расчет» (ЕРИП), в любом удобном для Вас месте, в
          удобное для Вас время, в удобном для Вас пункте банковского обслуживания – интернет-банке,
          с помощью мобильного банкинга, инфокиоске, кассе банков, банкомате и т.д.
        </p>
        <p className={styles.text}>
          Совершить оплату можно с использованием наличных денежных средств, электронных денег и
          банковских платежных карточек в пунктах банковского обслуживания банков, которые оказывают
          услуги по приему платежей, а также посредством инструментов дистанционного банковского
          обслуживания.
        </p>
        <p className={styles.text}>Для проведения платежа необходимо:</p>
        <ul className={styles.stepList}>
          <li className={styles.step}>
            <span className={styles.number}>1</span>
            <p className={styles.description}>Выбрать:</p>
          </li>
          <li>
            <ul className={styles.innerList}>
              <li className={styles.innerItem}>
                <div className={styles.dot} />
                <div className={styles.innerText}>Пункт “Система “Расчет” (ЕРИП);</div>
              </li>
              <li className={styles.innerItem}>
                <div className={styles.dot} />
                <div className={styles.innerText}>Интернет-магазины/сервисы;</div>
              </li>
              <li className={styles.innerItem}>
                <div className={styles.dot} />
                <div className={styles.innerText}>A-Z Латинские домены;</div>
              </li>
              <li className={styles.innerItem}>
                <div className={styles.dot} />
                <div className={styles.innerText}>D;</div>
              </li>
              <li className={styles.innerItem}>
                <div className={styles.dot} />
                <div className={styles.innerText}>Divan.by</div>
              </li>
            </ul>
          </li>
          <li className={styles.step}>
            <span className={styles.number}>2</span>
            <p className={styles.description}>Для оплаты ввести номер заказа;</p>
          </li>
          <li className={styles.step}>
            <span className={styles.number}>3</span>
            <p className={styles.description}>Проверить корректность информации;</p>
          </li>
          <li className={styles.step}>
            <span className={styles.number}>4</span>
            <p className={styles.description}>
              Далее Вы попадаете на страницу вашего заказа, где необходимо выбрать «Перейти к
              оплате»;
            </p>
          </li>
        </ul>
        <p className={styles.text}>
          Если Вы осуществляете платеж в кассе банка, пожалуйста, сообщите кассиру о необходимости
          проведения платежа через систему ”Расчет“ (ЕРИП).
        </p>
        <p className={styles.textHelp}>Вы также можете оплатить заказ по коду услуги в ЕРИП:</p>
        <ul className={styles.inner}>
          <li className={styles.innerItem}>
            <div className={styles.dot} />
            <div className={styles.innerText}>Пункт “Система “Расчет” (ЕРИП);</div>
          </li>
          <li className={styles.innerItem}>
            <div className={styles.dot} />
            <div className={styles.innerText}>Оплата в ЕРИП по коду услуги;</div>
          </li>
          <li className={styles.innerItem}>
            <div className={styles.dot} />
            <div className={styles.innerText}>Вводите код 4668291.</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(PagePaymentBlr);
