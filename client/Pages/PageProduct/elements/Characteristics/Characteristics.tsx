import React, { FC, HTMLAttributes, memo, useCallback, useState, useMemo } from 'react';
import loadable from '@loadable/component';
import cn from 'classnames';

import { Tab } from '@UI/ButtonTabs';
import List from '@UI/List';
import { SelectItemData } from '@UI/Select';
import PageProductStore from '@Stores/PageProduct';
import { ModuleProductData } from '@Types/ModuleProduct';
import {
  Scheme,
  Parameter,
  ImportantInfoData,
  ImportantParameter,
  Documents,
  DocumentData,
  Variant,
} from '@Pages/PageProduct/typings';
import SampleOption from './elements/SampleOption';
import styles from './Characteristics.module.css';

export interface CharacteristicsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  tabs?: Tab[];
  schemes?: Scheme[];
  parameters: Parameter[];
  importantInfo?: ImportantInfoData;
  importantParameters?: ImportantParameter[];
  documents: Documents;
  modules: ModuleProductData[];
}

const ButtonTabs = loadable(() => import('@UI/ButtonTabs'));
const Select = loadable(() => import('@UI/Select'));
const Dimension = loadable(() => import('./elements/Dimension'));
const Document = loadable(() => import('./elements/Document'));
const Hardness = loadable(() => import('./elements/Hardness'));
const SynchronousSchemes = loadable(() => import('./elements/SynchronousSchemes'));
const StringParameter = loadable(() => import('./elements/StringParameter'));
const ImportantInfo = loadable(() => import('./elements/ImportantInfo'));
const ModuleCounter = loadable(() => import('./elements/ModuleCounter'));
const SampleParameter = loadable(() => import('./elements/SampleParameter'));

const Characteristics: FC<CharacteristicsProps> = (props) => {
  const {
    className,
    title,
    tabs,
    schemes,
    parameters,
    importantInfo,
    importantParameters = [],
    documents,
    modules,
    ...restProps
  } = props;
  const [currentTab, setCurrentTab] = useState('0');

  const handleChangeTab = useCallback((e, tab) => {
    setCurrentTab(tab.id);
  }, []);

  const handleChangeParameter = useCallback((_e, items) => {
    items.forEach((item: any) => {
      PageProductStore.selectParameter({ ...item.data });
    });
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
                const options: SelectItemData[] = [];

                dropdown.variants.forEach((variant) => {
                  const id = variant.id ? variant.id : variant.productId;

                  options.push({
                    id: id.toString(),
                    title: variant.name,
                    name: variant.name,
                    image: variant.image,
                    href: variant.url,
                    price: variant.price,
                    selected: variant.selected,
                    data: {
                      groupId: dropdown.groupId,
                      variantId: id,
                    },
                  });
                });

                return (
                  <Select
                    className={styles.select}
                    title={dropdown.name}
                    defaultChecked={options.find((option) => option.selected)}
                    items={options}
                    wide
                    renderItem={(itemProps: SelectItemData) => {
                      return <SampleOption item={itemProps} className={cn(styles.option)} />;
                    }}
                    onChangeSelected={handleChangeParameter}
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
          {importantParameters.map((importantParameter, index) => {
            const [name, value] = importantParameter.title.split(':');

            return (
              <StringParameter
                key={index}
                className={styles.parameter}
                name={name}
                value={value}
                importantParameter={importantParameter}
              />
            );
          })}

          {parametersDefault.map((parameter, index) => {
            const [name, value] = parameter.variant.split(':');

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
          <div>
            <h2 className={styles.title}>Состав комплекта</h2>
            <List
              className={styles.modules}
              items={modules}
              renderChild={(module: ModuleProductData) => (
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
              renderChild={(document: DocumentData) => (
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
