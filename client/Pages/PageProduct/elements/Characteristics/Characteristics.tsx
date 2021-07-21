import React, { FC, HTMLAttributes, memo, useCallback, useState, useMemo } from 'react';
import cn from 'classnames';

import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import List from '@UI/List';
import Dimension from './elements/Dimension';
import ImportantInfo from './elements/ImportantInfo';
import styles from './Characteristics.module.css';

export interface SchemeImage {
  url: string;
  width: number;
  height: number;
}

export interface Scheme {
  id: string;
  images: SchemeImage[];
}

export interface Value {
  name: string;
  value: string;
}

export interface Variant {
  id: number;
  name: string;
  image: string;
  theme: string;
  selected: boolean;
}

export interface Parameter {
  theme: 'default' | 'dropdown' | 'dimension';
  name?: string;
  variant?: string;
  groupId?: number;
  values?: Value[];
  variants?: Variant[];
}

export interface CharacteristicsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  tabs?: Tab[];
  schemes?: Scheme[];
  parameters: Parameter[];
  importantInfo?: {
    text: string;
    title: string;
  };
}

const Characteristics: FC<CharacteristicsProps> = (props) => {
  const { className, title, tabs, schemes, parameters, importantInfo, ...restProps } = props;
  const [currentTab, setCurrentTab] = useState('0');

  const handleChangeTab = useCallback((e, tab) => {
    setCurrentTab(tab.id);
  }, []);

  const parametersDimension = useMemo(() => {
    return parameters.filter((parameter) => parameter.theme === 'dimension');
  }, [parameters]);

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
        <List
          className={styles.schemes}
          items={schemes}
          renderChild={(item: Scheme) => (
            <List
              className={cn(styles.scheme, { [styles.active]: item.id === currentTab })}
              items={item.images}
              renderChild={(image: SchemeImage) => (
                <img src={image.url} className={styles.schemeImg} alt='' />
              )}
            />
          )}
        />
      )}
      <div className={styles.row}>
        <List
          className={styles.col}
          items={parametersDimension}
          renderChild={(dimension: Parameter) => (
            <Dimension
              className={styles.dimension}
              name={dimension.name}
              value={dimension.values}
            />
          )}
        />
        <div className={styles.col} />
      </div>
      <div className={styles.row}>
        {importantInfo && (
          <ImportantInfo
            className={styles.ImportantInfo}
            title={importantInfo.title}
            text={importantInfo.text}
          />
        )}
      </div>
    </div>
  );
};

export default memo(Characteristics);
