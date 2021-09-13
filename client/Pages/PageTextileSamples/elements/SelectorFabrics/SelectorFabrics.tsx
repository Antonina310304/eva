import React, {
  FC,
  HTMLAttributes,
  useCallback,
  memo,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';

import Button from '@UI/Button';
import Input from '@UI/Input';
import InputPhone from '@Components/InputPhone';
import Link from '@UI/Link';
import Form from '@UI/Form';
import FabricSample from '@Components/FabricSample';
import FabricExtraSample from '@Components/FabricExtraSample';
import ConstructorGroup from '@Components/ConstructorGroup';
import ServicePageParagraphTitle from '@Components/ServicePageParagraphTitle';
import useModals from '@Hooks/useModals';
import { IConstructorGroup, ConstructorCollection } from '@Types/Constructor';
import useMedias from '@Hooks/useMedias';
import Filtrator from '@Stores/Filtrator';
import { PageTextileSamplesData } from '@Pages/PageTextileSamples/typings';
import styles from './SelectorFabrics.module.css';

const Filters = loadable(() => import('../Filters'));

export type Step = 'preview' | 'order';

export interface SelectorFabricsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  pageData: PageTextileSamplesData;
}

const SelectorFabrics: FC<SelectorFabricsProps> = (props) => {
  const { className, pageData, ...restProps } = props;
  const [, { openModal, closeModal }] = useModals();
  const [waiting, setWaiting] = useState(false);
  const { isMobile } = useMedias();
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [checkedSamples, setCkeckedSamples] = useState([
    {
      sample: null,
    },
    {
      sample: null,
    },
    {
      sample: null,
    },
    {
      sample: null,
    },
    {
      sample: null,
    },
  ]);
  const [step, setStep] = useState<Step>('preview');
  const refRight = useRef(null);
  const refForm = useRef(null);
  const refLeft = useRef(null);
  const refCatalog = useRef<HTMLDivElement>(null);

  function collectCollections(data: PageTextileSamplesData): ConstructorCollection[] {
    // Формируем коллекции тканей
    const collectionsMap = {};
    data.parameterValues
      .filter((p) => p.type === 'fabric')
      // Оставляем только ткани, которые являются товарами-образцами
      .filter((p) => !!p.sampleId)
      .forEach((fabric) => {
        const { collectionId } = fabric.tags;

        if (collectionsMap[collectionId]) {
          if (fabric.price < collectionsMap[collectionId].minPrice) {
            collectionsMap[collectionId].minPrice = fabric.price;
          }

          collectionsMap[collectionId].fabrics.push(fabric);
        } else {
          collectionsMap[collectionId] = {
            ...data.tags.collections[collectionId],
            minPrice: fabric.price,
            fabrics: [fabric],
          };
        }
      });

    return Object.values(collectionsMap);
  }

  const orderFabrics = collectCollections(pageData);

  const handleApplyFilters = useCallback(async () => {
    const filteredParameters = Filtrator.formatFiltersToObject();

    if (Object.keys(filteredParameters).length === 0 && filteredParameters.constructor === Object) {
      closeModal('Filters');
      return;
    }

    if (filteredParameters.parameters[40]) setSelectedColors(filteredParameters.parameters[40]);
    if (filteredParameters.parameters[10]) setSelectedTags(filteredParameters.parameters[10]);
    if (filteredParameters.parameters[20])
      setSelectedCollections(filteredParameters.parameters[20]);
    closeModal('Filters');
  }, [closeModal]);

  const hanleOpenFilters = useCallback(
    (_e, selectedFilterId: string) => {
      openModal('Filters', { selectedFilterId, onApply: handleApplyFilters });
    },
    [handleApplyFilters, openModal],
  );

  const selectedSamples = checkedSamples.filter((selected) => !!selected.sample);
  const disabled = selectedSamples.length < 1;
  const opened = selectedSamples.length > 0;

  const groups = useMemo(() => {
    // Фильтруем
    let filteredCollections = [...orderFabrics];
    const result: IConstructorGroup[] = [];

    // Фильтруем по цвету
    const colors = selectedColors;
    filteredCollections = filteredCollections.map((collection) => {
      if (!colors.length) return collection;

      return {
        ...collection,
        fabrics: collection.fabrics.filter((fabric) => colors.includes(fabric.tags.colorId)),
      };
    });

    // Фильтруем по свойствам
    const tags = selectedTags;
    filteredCollections = filteredCollections.map((collection) => {
      if (!tags.length) return collection;

      return {
        ...collection,
        fabrics: collection.fabrics.filter((fabric) => {
          if (!fabric.tags.typeIds.length) return false;

          return tags.some((typeId) => fabric.tags.typeIds.includes(typeId));
        }),
      };
    });

    // Фильтруем по коллекциям
    const collections = selectedCollections;

    filteredCollections = filteredCollections.map((collection) => {
      if (!collections.length) return collection;

      return {
        ...collection,
        fabrics: collection.fabrics.filter((fabric) =>
          collections.includes(fabric.tags.collectionId),
        ),
      };
    });

    // Оставляем только те коллекции, в которых есть ткани и сортируем
    filteredCollections = filteredCollections.filter((collection) => collection.fabrics.length > 0);
    filteredCollections = filteredCollections.sort((ca, cb) => ca.sort - cb.sort);

    // Собираем в группы
    filteredCollections.forEach((collection) => {
      const groupTags = [];
      // collection.tags.typeIds.map((typeId) => groupTags.push(orderFabrics.data.tags.types[typeId]));
      collection.tags.typeIds.map((typeId) => groupTags.push(pageData.tags.types[typeId]));

      result.push({
        tags: groupTags,
        extensive: true,
        title: `${collection.title} (${collection.material})`,
        description: collection.description,
        samples: collection.fabrics,
        additional: [
          collection.compound && {
            id: 1,
            name: 'Состав',
            value: collection.compound,
          },
          collection.resistance && {
            id: 2,
            name: 'Устойчивость к истиранию',
            value: collection.resistance,
          },
        ].filter((p) => !!p),
      });
    });

    return result;
  }, [orderFabrics, pageData.tags.types, selectedCollections, selectedColors, selectedTags]);

  // const count = useMemo(() => {
  //   const res = groups.reduce((total, item) => {
  //     total += item.samples.length;
  //     return total;
  //   }, 0);

  //   return res;
  // }, [groups]);

  const transformDataBeforeSubmit = useCallback(
    (data) => {
      const ids = [];
      checkedSamples.map(({ sample }) => {
        return sample && ids.push(sample.sampleId);
      });

      return {
        ...data,
        'FabricsForm[fabricIds][]': ids,
      };
    },
    [checkedSamples],
  );

  const handleSubmit = useCallback(() => {
    setWaiting(true);
  }, []);

  const handleError = useCallback(() => {
    setWaiting(false);

    openModal('Info', {
      view: 'error',
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });

    setStep('preview');
  }, [openModal]);

  const handleResponse = useCallback(
    (response) => {
      setWaiting(false);

      if (response.status !== 'ok') {
        handleError();
        return;
      }

      openModal('Info', {
        view: 'success',
        title: 'Заявка принята!',
        text: 'Благодарим за выбор divan.ru. Наш оператор свяжется с вами в ближайшее время.',
      });

      setStep('preview');
    },
    [handleError, openModal],
  );

  // Выбрать/снять образец ткани
  const toggleSelect = useCallback(
    ({ sample }) => {
      let newSelected = [...checkedSamples];
      const foundedIndex = newSelected.findIndex(
        (selected) => selected.sample?.value === sample.value,
      );

      if (foundedIndex > -1) {
        newSelected = [
          ...newSelected.slice(0, foundedIndex),
          ...newSelected.slice(foundedIndex + 1),
          { sample: null },
        ];
      } else {
        const freeIndex = newSelected.findIndex((selected) => !selected.sample);

        newSelected[freeIndex] = { sample };
      }

      setCkeckedSamples(newSelected);
    },
    [checkedSamples],
  );

  // Возваращаемся на шаг с превью, если на шаге заказа пользователь удалил все ткани
  useEffect(() => {
    if (opened || step === 'preview') return;

    setStep('preview');
  }, [opened, step]);

  return (
    <div {...restProps} className={cn(styles.selectorFabrics, className)}>
      <div className={styles.head}>
        <ServicePageParagraphTitle
          className={styles.title}
          title='Выберите до 5 образцов мебельных тканей'
        />
      </div>

      <div className={styles.filtersWrapper}>
        <Filters onOpen={hanleOpenFilters} onChangeSort={handleApplyFilters} />
      </div>

      <div className={styles.wrapperMainContent}>
        <div className={styles.left} ref={refLeft}>
          {groups.length > 0 ? (
            <div className={styles.wrapperCollections} ref={refCatalog}>
              {groups.map((group, index) => (
                <ConstructorGroup
                  className={styles.constructorGroup}
                  key={index}
                  group={group}
                  groupView='mobileDesktop'
                  slotCatalogItem={
                    <FabricExtraSample
                      className={styles.fabricExtraSample}
                      sample={null}
                      refCatalog={refCatalog}
                      checkedSamples={checkedSamples}
                      checkSample={toggleSelect}
                    />
                  }
                />
              ))}
            </div>
          ) : (
            <div className={styles.notFound}>
              <div className={styles.notFoundTitle}>Тканей не найдено.</div>
              Попробуйте смягчить критерии поиска
            </div>
          )}
        </div>

        <div className={styles.right} ref={refRight}>
          <div
            className={cn(styles.containerForm, {
              [styles.opened]: opened,
            })}
            ref={refForm}
          >
            {step !== 'order' && (
              <div className={styles.mobileForm}>
                <ServicePageParagraphTitle
                  className={styles.titleForm}
                  title='Выберите до 5 образцов мебельных тканей'
                />

                <div className={styles.formContainer}>
                  <div className={styles.samplesFormContent}>
                    <div className={styles.examples}>
                      {checkedSamples.map((item, index) => (
                        <FabricSample
                          key={index}
                          className={styles.exampleMobile}
                          removable
                          sample={item.sample}
                          checkSample={toggleSelect}
                        />
                      ))}
                    </div>

                    {!isMobile && (
                      <div className={styles.samplesFormInfoMobile}>
                        <div>Стоимость курьерской доставки образцов - от 300 ₽ </div>

                        <div className={styles.samplesFormInfoRow}>
                          {`Подтверждая заказ, я соглашаюсь с условиями `}
                          <Link view='native' to='/static-page/privacy-policy'>
                            Политики конфиденциальности
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <Form
                    className={styles.samplesFormWrapperInfo}
                    action='/site/fabrics-form'
                    validationSchemaUrl='/json-schema/fabrics-form'
                    transformDataBeforeSubmit={transformDataBeforeSubmit}
                    onSubmit={handleSubmit}
                    onResponse={handleResponse}
                    onError={handleError}
                  >
                    <div className={styles.inputs}>
                      <Input className={styles.input} placeholder='Имя' name='FabricsForm[name]' />
                      <InputPhone
                        className={styles.input}
                        placeholder='Телефон'
                        name='FabricsForm[phone]'
                      />
                    </div>

                    <Button
                      className={styles.submit}
                      type='submit'
                      waiting={waiting}
                      disabled={disabled}
                    >
                      Заказать ткани
                    </Button>
                  </Form>

                  {isMobile && (
                    <div className={styles.samplesFormInfoMobile}>
                      <div>Стоимость курьерской доставки образцов - от 300 ₽ </div>

                      <div className={styles.samplesFormInfoRow}>
                        {`Подтверждая заказ, я соглашаюсь с условиями `}
                        <Link view='native' to='/static-page/privacy-policy'>
                          Политики конфиденциальности
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SelectorFabrics);
