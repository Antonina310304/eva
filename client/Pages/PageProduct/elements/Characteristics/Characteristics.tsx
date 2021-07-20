import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import List from '@UI/List';
import styles from './Characteristics.module.css';

export interface Scheme {
  id: string;
  images: string[];
}

export interface CharacteristicsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  tabs?: Tab[];
  schemes?: Scheme[];
}

const Characteristics: FC<CharacteristicsProps> = (props) => {
  const { className, title, tabs, schemes, ...restProps } = props;
  const [currentTab, setCurrentTab] = useState('0');

  const handleChangeTab = useCallback((e, tab) => {
    setCurrentTab(tab.id);
  }, []);

  return (
    <div {...restProps} className={cn(styles.characteristics, className)}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        {tabs && (
          <ButtonTabs
            className={styles.tabs}
            defaultValue='0'
            tabs={tabs}
            inversed
            onChangeTab={handleChangeTab}
          />
        )}
      </div>
      {schemes && (
        <div className={styles.schemes}>
          <List
            items={schemes}
            renderChild={(item: Scheme) => (
              <div className={cn(styles.scheme, { [styles.active]: item.id === currentTab })}>
                <List
                  items={item.images}
                  renderChild={(image: string) => (
                    <img src={image} alt='' className={styles.schemeImg} />
                  )}
                />
              </div>
            )}
          />
        </div>
      )}
      <div className={styles.row}>
        <div className={styles.col} />
        <div className={styles.col} />
      </div>
    </div>
  );
};

export default memo(Characteristics);
