import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';

import { ApiPecom } from '@Api/Pecom';
import InputHelperAddress from '@Components/InputHelperAddress';
import { InputHelperHint } from '@UI/InputHelper';
import Price from '@UI/Price';
import useMeta from '@Queries/useMeta';
import styles from './ShippingCostCalculator.module.css';

export interface ShippingCostCalculatorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const errors = {
  server: 'Сбой при расчёте доставки. Обратитесь, пожалуйста, на горячую линию',
  notSelectedAddress: 'Введите адрес в поле выше и выберите пункт из выпадающего списка',
  notFullAddress: 'Введите полный адрес в формате город, улица, дом',
};

const ShippingCostCalculator: FC<ShippingCostCalculatorProps> = (props) => {
  const { className, ...restProps } = props;
  const meta = useMeta({ ssr: true });
  const [loading, setLoading] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(null);
  const [error, setError] = useState<string>(null);
  const [selectedHint, setSelectedHint] = useState<InputHelperHint>(null);

  const handleCalculate = useCallback(
    async (_e, targetHint?: InputHelperHint) => {
      const hint = targetHint || selectedHint;

      if (targetHint) {
        setSelectedHint(targetHint);
      }

      if (!hint) {
        setPrice(null);
        setError(errors.notSelectedAddress);
        return;
      }

      if (!hint.data.house) {
        setPrice(null);
        setError(errors.notFullAddress);
        return;
      }

      setLoading(true);

      try {
        const params = {
          id: meta.data.region.id,
          latitude: +hint.data.latitude,
          longitude: +hint.data.longitude,
        };
        const cost = await ApiPecom.getDeliveryCostByRegion(params);

        setError(null);
        setPrice(cost);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setPrice(null);
        setError(errors.server);
      } finally {
        setLoading(false);
      }
    },
    [meta.data.region.id, selectedHint],
  );

  const handleFocus = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div {...restProps} className={cn(styles.calculator, [className])}>
      <div className={styles.form}>
        <span className={styles.label}>Адрес</span>
        <InputHelperAddress
          wide
          className={styles.input}
          placeholder='Поиск адреса'
          error={error}
          onFocus={handleFocus}
          onSelectHint={handleCalculate}
        />
        <Button
          className={styles.action}
          wide
          theme='primary'
          waiting={loading}
          onClick={handleCalculate}
        >
          Рассчитать
        </Button>
      </div>

      {price && (
        <>
          <div className={styles.price}>
            {`Стоимость выезда за пределы города — `}
            <Price price={price} />
          </div>

          <div className={styles.hint}>
            Стоимость указана без учета основного тарифа доставки по городу
          </div>
        </>
      )}
    </div>
  );
};

export default memo(ShippingCostCalculator);
