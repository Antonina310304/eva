import React, { FC, HTMLAttributes, memo, useCallback, useState, useMemo } from 'react';
import cn from 'classnames';

import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import List from '@UI/List';
import Dimension from './elements/Dimension';
import Document from './elements/Document';
import SynchronousSchemes from './elements/SynchronousSchemes';
import StringParameter from './elements/StringParameter';
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

export interface Document {
  icon: string;
  name: string;
  sizeInfo: string;
  url: string;
}

export interface Documents {
  title: string;
  items: Document[];
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
  documents: Documents;
}

const Characteristics: FC<CharacteristicsProps> = (props) => {
  const {
    className,
    title,
    tabs,
    schemes,
    parameters,
    importantInfo,
    documents,
    ...restProps
  } = props;
  const [currentTab, setCurrentTab] = useState('0');

  const handleChangeTab = useCallback((e, tab) => {
    setCurrentTab(tab.id);
  }, []);

  const parametersDimension = useMemo(() => {
    return parameters.filter((parameter) => parameter.theme === 'dimension');
  }, [parameters]);

  const parametersDefault = useMemo(() => {
    return parameters.filter((parameter) => parameter.theme === 'default');
  }, [parameters]);

  const parametersDropdown = useMemo(() => {
    return parameters.filter((parameter) => parameter.theme === 'dropdown');
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
            <SynchronousSchemes
              className={cn(styles.scheme, { [styles.active]: item.id === currentTab })}
              schemes={item.images}
            />
          )}
        />
      )}
      <div className={cn(styles.row, { [styles.columns]: true })}>
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
        <div className={styles.col}>
          <List
            className={styles.col}
            items={parametersDefault}
            renderChild={(parameter: Parameter) => {
              // TODO: поменять формат
              const name = parameter.variant.split(':')[0];
              const value = parameter.variant.split(':')[1];

              return <StringParameter className={styles.parameter} name={name} value={value} />;
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        {importantInfo && (
          <ImportantInfo
            className={styles.ImportantInfo}
            title={importantInfo.title}
            text={importantInfo.text}
          />
        )}
        {documents && (
          <List
            className={styles.documents}
            items={documents.items}
            renderChild={(document: Document) => (
              <Document
                className={styles.document}
                icon={document.icon}
                name={document.name}
                sizeInfo={document.sizeInfo}
                url={document.url}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default memo(Characteristics);
