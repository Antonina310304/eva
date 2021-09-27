import React, { FC, HTMLAttributes, useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import { SleeperProductsData } from '@Types/SleeperGallery';
import { SelectItemData } from '@UI/Select';
import MainSelect from '@UI/MainSelect';

import declOfNum from '@Utils/declOfNum';
import Button from '@UI/Button';
import useMedias from '@Hooks/useMedias';
import styles from './Offer.module.css';

export interface OfferProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  products: SleeperProductsData[];
}

const Offer: FC<OfferProps> = ({ className, products }) => {
  const [activeSize, setActiveSize] = useState(products[0]);
  const bonusTitles = ['бонус', 'бонуса', 'бонусов'];
  const { isMobile, isDesktop, isOnlyDesktop } = useMedias();

  const items = useMemo(() => {
    const result: SelectItemData[] = products.map((item) => {
      return { id: String(item.id), title: item.name, name: item.name };
    });

    result[0] = { ...result[0], selected: true };
    return result;
  }, [products]);

  const handleChangeSize = useCallback(
    (checkedItems) => {
      const changedSize = products.find((i) => i.id === Number(checkedItems[0].id));
      setActiveSize(changedSize);
    },
    [products],
  );

  const handlerClick = useCallback(() => {
    /* добавление в корзину матраса */
  }, []);

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={cn(styles.wpar, styles.selectWrapper)}>
        {!isMobile && isDesktop && <p className={styles.title}>Выберите размер</p>}
        <MainSelect
          onChangeSelected={(_e, checkedItems) => handleChangeSize(checkedItems)}
          title={(isMobile || isOnlyDesktop) && 'Размеры'}
          className={styles.select}
          items={items}
        />
      </div>
      <div className={styles.inner}>
        <div className={styles.price}>
          <p className={styles.currentPRice}>{`${activeSize.price.actual.toLocaleString()} ₽`}</p>
          {activeSize.price.expired && (
            <p className={styles.oldPRice}>{`${activeSize.price.expired.toLocaleString()} ₽`}</p>
          )}
          {activeSize.price.discount && (
            <div className={styles.discount}>
              <span>{`${activeSize.price.discount}%`}</span>
            </div>
          )}
        </div>
        {activeSize.bonus && (
          <p className={styles.bonus}>
            {`+${activeSize.bonus} ${declOfNum(activeSize.bonus, bonusTitles)}`}
          </p>
        )}
      </div>
      <div className={styles.button}>
        <Button wide onClick={handlerClick}>
          В корзину
        </Button>
      </div>
    </div>
  );
};

export default Offer;
