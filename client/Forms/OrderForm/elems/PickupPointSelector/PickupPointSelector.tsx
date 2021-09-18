import { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import useModals from '@Hooks/useModals';
import styles from './PickupPointSelector.module.css';

export interface PickupPointSelectorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PickupPointSelector: FC<PickupPointSelectorProps> = (props) => {
  const { className, ...restProps } = props;
  const [, { openModal }] = useModals();
  const [pickupPoint] = useState(null);

  const handleClickButton = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  return (
    <div {...restProps} className={cn(styles.selector, className)}>
      <div className={styles.label}>
        Выберите удобный пункт самовывоза, и мы доставим товар туда в ближайшее время.
      </div>

      <Button className={styles.button} wide theme='secondary' onClick={handleClickButton}>
        {pickupPoint ? 'Другой пункт выдачи' : 'Выбрать пункт выдачи'}
      </Button>

      {/* TODO: сделать отображение выбранного пункта выдачи  */}
      {/* {pickupPoint && (
            <div className={b('PickupPoint')}>
              <div className={b('PickupPointTitle')}>
                Доставка ТК «ПЭК» до пункта выдачи:
              </div>
              <div className={b('PickupPointText')}>
                {deliveryType.address || selectedPickupPoint.address}
              </div>
            </div>
          )} */}
    </div>
  );
};

export default memo(PickupPointSelector);
