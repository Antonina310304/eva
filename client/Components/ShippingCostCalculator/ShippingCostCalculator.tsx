import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import cn from 'classnames';

import Button from '@UI/Button';

import { ApiPecom } from '@Api/Pecom';
import InputHelper, { InputHelperHint } from '@UI/InputHelper';
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
  const [loadingHints, setLoadingHints] = useState<boolean>(false);
  const [hints, setHints] = useState<InputHelperHint[]>([]);
  const [price, setPrice] = useState<number>(null);
  const [error, setError] = useState<string>(null);

  const [debouceChangeValue] = useDebouncedCallback(async (chunk: string) => {
    if (!chunk || chunk.length < 3) return;

    setLoadingHints(true);

    try {
      const addressHints: any[] = await ApiPecom.getAddressHints({ chunk });

      setHints(() => {
        return addressHints.map((addressHint, index) => ({
          id: index,
          title: addressHint.fullAddress,
          data: addressHint,
        }));
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoadingHints(false);
    }
  }, 400);

  const handleChangeAddress = useCallback(
    (e) => {
      debouceChangeValue(e.target.value);
    },
    [debouceChangeValue],
  );

  const handleCalculate = useCallback(
    async (_e, selectedHint?: InputHelperHint) => {
      const hint = selectedHint || hints[0];

      if (!hint) {
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
        console.error(err);
        setPrice(null);
        setError(errors.server);
      } finally {
        setLoading(false);
      }
    },
    [hints, meta.data],
  );

  const handleFocus = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div {...restProps} className={cn(styles.calculator, [className])}>
      <div className={styles.label}>Узнать стоимость доставки</div>
      <div className={styles.form}>
        <InputHelper
          className={styles.input}
          placeholder='город, улица, дом, этаж, квартира'
          loading={loadingHints}
          hints={hints}
          error={error}
          onChange={handleChangeAddress}
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
