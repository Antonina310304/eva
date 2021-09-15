import React, { FC, memo, useMemo } from 'react';

import Section from '@Components/Section';
import { SellPointData } from '@Pages/PageContacts/typings';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import useMedias from '@Hooks/useMedias';
import styles from './LocationsSlider.module.css';

export interface LocationsSliderProps {
  className?: string;
  pickupPoints: SellPointData[];
}

const LocationsSlider: FC<LocationsSliderProps> = ({ pickupPoints }) => {
  const { isMobileM } = useMedias();
  const tabs = useMemo(() => {
    return pickupPoints.reduce((acc: Tab[], item) => {
      // если нет расположения или изображений
      if (item.name === '' && item.images.length < 1) {
        return acc;
      }
      // проверка на дубли
      const tab = acc.find((t) => t.id === item.name);
      if (tab) return acc;

      return [...acc, { id: item.name, label: item.name }];
    }, []);
  }, [pickupPoints]);

  return (
    <div>
      <Section title='Магазины Диван.ру' />
      <div>
        <div className={styles.tabWrapper}>
          <ButtonTabs scrollable defaultValue={tabs[0].id} tabs={tabs} />
        </div>
        {/* слайдер */}
        {isMobileM ? <p>мобильный слайдер</p> : <p>слайдер для ПК</p>}
      </div>
    </div>
  );
};

export default memo(LocationsSlider);
