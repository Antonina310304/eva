import React, { FC, HTMLAttributes, memo, useCallback, useState, useMemo } from 'react';
import cn from 'classnames';

import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import List from '@UI/List';
import Select from '@UI/Select';
import Dimension from './elements/Dimension';
import Document from './elements/Document';
import Hardness from './elements/Hardness';
import SynchronousSchemes from './elements/SynchronousSchemes';
import StringParameter from './elements/StringParameter';
import ImportantInfo from './elements/ImportantInfo';
import SampleOption, { SampleOptionProps } from './elements/SampleOption';
import ModuleCounter from './elements/ModuleCounter';
import SampleParameter from './elements/SampleParameter';
import styles from './Characteristics.module.css';

export interface SchemeImage {
  url: string;
  width: number;
  height: number;
}
export interface ModuleImage {
  src: string;
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
  id?: number;
  productId?: number;
  name: string;
  title?: string;
  image: string;
  detailImage?: string;
  theme: string;
  selected: boolean;
  url?: string;
  price?: string;
}

export interface Parameter {
  theme: 'default' | 'dropdown' | 'dimension' | 'circle' | 'hardness';
  name?: string;
  variant?: string;
  groupId?: number;
  values?: Value[];
  variants?: Variant[];
  value?: string;
  icon?: string;
  description?: string[];
}

export interface Document {
  icon: string;
  name: string;
  sizeInfo: string;
  url: string;
}

export interface Module {
  categoryColor: string;
  count: number;
  extraBonus: boolean;
  id: number;
  images: ModuleImage[];
  link: string;
  maxQuantity: number;
  minQuantity: number;
  modelId: number;
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
  modules: Module[];
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
    modules,
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

  const parametersCircle = useMemo(() => {
    return parameters.filter((parameter) => parameter.theme === 'circle');
  }, [parameters]);

  const parametersHardness = useMemo(() => {
    return parameters.filter((parameter) => parameter.theme === 'hardness');
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
        <div className={styles.col}>
          {parametersDimension.length > 0 && (
            <List
              className={styles.dimensions}
              items={parametersDimension}
              renderChild={(dimension: Parameter) => (
                <Dimension
                  className={styles.dimension}
                  name={dimension.name}
                  value={dimension.values}
                />
              )}
            />
          )}
          {parametersDropdown.length > 0 && (
            <List
              className={styles.selects}
              items={parametersDropdown}
              renderChild={(dropdown: Parameter) => {
                const options: any[] = [];
                dropdown.variants.forEach((variant) => {
                  options.push({
                    id: variant.id ? variant.id : variant.productId,
                    title: variant.name,
                    name: variant.name,
                    image: variant.image,
                    href: variant.url,
                    price: variant.price,
                    selected: variant.selected,
                  });
                });

                return (
                  <Select
                    className={styles.select}
                    title={dropdown.name}
                    defaultChecked={options.find((option) => option.selected)}
                    items={options}
                    wide
                    renderItem={(option: SampleOptionProps, active) => {
                      return (
                        <SampleOption
                          {...option}
                          className={cn(styles.option, { [styles.active]: active })}
                          active={active}
                        />
                      );
                    }}
                  />
                );
              }}
            />
          )}

          {parametersHardness.length > 0 && (
            <List
              className={styles.hardness}
              items={parametersHardness}
              renderChild={(hardness: Parameter) => (
                <Hardness
                  name={hardness.name}
                  value={hardness.value}
                  icon={hardness.icon}
                  description={hardness.description}
                />
              )}
            />
          )}
        </div>
        <div className={styles.col}>
          {parametersDefault.map((parameter, index) => {
            // TODO: поменять формат
            const name = parameter.variant.split(':')[0];
            const value = parameter.variant.split(':')[1];

            return (
              <StringParameter key={index} className={styles.parameter} name={name} value={value} />
            );
          })}
          {parametersCircle.map((parameter) =>
            parameter.variants.map((variant: Variant, index) => (
              <SampleParameter
                key={index}
                className={styles.parameter}
                name={variant.name}
                title={variant.title}
                image={variant.image}
              />
            )),
          )}
        </div>
      </div>
      {modules.length > 0 && (
        <div className={cn(styles.row, { [styles.columns]: true })}>
          <h2 className={styles.title}>Состав комплекта</h2>
          <div className={styles.col}>
            <List
              className={styles.modules}
              items={modules}
              renderChild={(module: Module) => (
                <ModuleCounter className={styles.module} name={module.name} count={module.count} />
              )}
            />
          </div>
        </div>
      )}
      {importantInfo && documents && (
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
      )}
    </div>
  );
};

export default memo(Characteristics);
