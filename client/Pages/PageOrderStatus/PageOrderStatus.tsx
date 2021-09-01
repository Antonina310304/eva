import React, { FC, HTMLAttributes, memo, useMemo, useState, useCallback } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import Button from '@UI/Button';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import ServicePageTitle from '@Components/ServicePageTitle';
import ServicePageParagraphTitle from '@Components/ServicePageParagraphTitle';
import Checkbox from '@UI/Checkbox';
import Box from './elements/Box';
import ProductCard from './elements/ProductCard';
import Check, { CheckGroup } from './elements/Check';
import PriceContainer from './elements/PriceContainer';
import { PageOrderStatusData, ProductData } from './typings';
import styles from './PageOrderStatus.module.css';

export interface PageOrderStatusProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: типизируй меня полностью
  page: PageOrderStatusData;
  meta: MetaData;
}

const PageOrderStatus: FC<PageOrderStatusProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { uuid, number, status, positions, payment, price, services } = page;
  const [, { openModal }] = useModals();
  const [waiting, setWaiting] = useState(false);
  const hasServices = !!price.services;

  // Плоский список товаров
  const products = useMemo(() => {
    let result: ProductData[] = [];

    positions.forEach((position) => {
      result = result.concat(position.products);
    });

    return result;
  }, [positions]);

  // Суммарная стоимость товаров
  const summCostProducts = useMemo(() => {
    return products.reduce((accumulator, product) => accumulator + product.price, 0);
  }, [products]);

  // Группы для «чека»
  const checkGroups = useMemo(() => {
    const result: CheckGroup[] = [];

    // Добавляем все товары в первую группу
    result.push({
      items: products.map((product) => ({
        name: `${product.type} ${product.name}`,
        cost: product.price,
        quantity: product.quantity,
      })),
    });

    return result;
  }, [products]);

  // Добавляем группу с доп. услугами
  const checkServices = useMemo(() => {
    const result: CheckGroup[] = [];
    if (hasServices) {
      result.push({
        items: services.map((service) => ({
          name: service.name,
          cost: service.cost,
          quantity: service.count,
        })),
      });
    }
    return result;
  }, [services, hasServices]);

  // Группа с итоговой суммой
  const checkTotal = useMemo(() => {
    const result: CheckGroup[] = [];
    result.push({
      items: [
        hasServices && {
          isTotal: true,
          name: 'ИТОГО',
          cost: summCostProducts + price.services,
        },
        payment.paid > 0 && {
          isTotal: true,
          name: 'Оплачено:',
          cost: payment.paid,
        },
      ].filter(Boolean),
    });

    return result;
  }, [payment.paid, price.services, summCostProducts, hasServices]);

  // Группа с итоговой суммой дополнительных услуг
  const checkAdditionalTotal = useMemo(() => {
    const result: CheckGroup[] = [];
    result.push({
      items: [
        hasServices && {
          name: 'Дополнительные услуги',
          cost: price.services,
        },
      ].filter(Boolean),
    });

    return result;
  }, [hasServices, price.services]);

  const handleError = useCallback(() => {
    openModal('Info', {
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });
  }, [openModal]);

  const handlePay = useCallback(async () => {
    // setWaiting(true);
    // try {
    //   const res = await (await get('/order/pay', {}, { id: uuid })).json();
    //   if (!res['bank-card-params']) {
    //     handleError();
    //     return;
    //   }
    //   // Если есть параметры карты, то сразу отправляем человека на страницу оплаты
    //   const bankCardParams = res['bank-card-params'];
    //   if (bankCardParams) {
    //     redirectToPayment(bankCardParams);
    //   }
    // } catch (err) {
    //   handleError();
    // } finally {
    //   setWaiting(false);
    // }
  }, []);

  console.log('page', page);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <div className={styles.wrapper}>
        <ServicePageTitle className={styles.title} title={`Ваш заказ ${number || ''}`} />

        <div className={styles.status}>
          <div className={styles.statusLabel}>Текущее состояние:</div>
          <div className={styles.statusValue}>{status}</div>
        </div>
      </div>

      <div className={cn(styles.wrapper, styles.wrapperList)}>
        <div className={styles.main}>
          <div className={styles.list}>
            {products.map((product, index) => {
              const collapsed = products.length > 1;

              return (
                <Box className={styles.listItem} view='product' key={index}>
                  <ProductCard defaultCollapsed={collapsed} product={product} />
                </Box>
              );
            })}
          </div>

          <Box className={styles.check} view='check'>
            <ServicePageParagraphTitle className={styles.checkTitle} title='Ваш заказ' />
            <Check groups={checkGroups} className={styles.table} />

            {!!price.services && <Check groups={checkAdditionalTotal} className={styles.table} />}

            <Check groups={checkTotal} className={cn(styles.table, styles.summary)} />

            <div className={styles.wrapperTotal}>
              {payment.button && (
                <Button className={styles.buttonAction} waiting={waiting} onClick={handlePay}>
                  Согласен
                </Button>
              )}
            </div>

            <div className={styles.agreement}>
              <div>
                <Checkbox checked />
              </div>
              <div className={styles.agreementText}>
                {`Согласен на получение `}
                <Link to='#' view='native' target='_blank'>
                  рекламно-информационных сообщений
                </Link>
              </div>
            </div>

            <div className={styles.hint}>
              {`*Оформляя заказ, я соглашаюсь с условиями `}
              <Link to='/static-page/privacy-policy' view='native' target='_blank'>
                Политики конфиденциальности
              </Link>
              {` и `}
              <Link to='/static-page/oferta' view='native' target='_blank'>
                Договора оферты
              </Link>
            </div>
          </Box>
        </div>

        <div className={styles.separator} />
      </div>
    </div>
  );
};

export default memo(PageOrderStatus);
