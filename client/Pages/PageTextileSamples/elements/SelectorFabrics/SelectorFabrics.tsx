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
import Form from '@UI/Form';
import Input from '@UI/Input';
import InputPhone from '@Components/InputPhone';
import Link from '@UI/Link';
// import Wrapper from '@divanru/ts-ui/Wrapper';
import FabricSample from '@Components/FabricSample';
import FabricExtraSample from '@Components/FabricExtraSample';
import FabricFilters from '@Components/FabricFilters';
import ConstructorGroup from '@Components/ConstructorGroup';
import ServicePageParagraphTitle from '@Components/ServicePageParagraphTitle';
import useModals from '@Hooks/useModals';
import useOrderFabrics from '@Hooks/useOrderFabrics';
import useFilters from '@Hooks/useFilters';
import { IConstructorGroup } from '@Types/Constructor';
import useMedias from '@Hooks/useMedias';
import Icon8ChevronDownThin from '@divanru/icons/dist/8/chevron_down_thin';
import Icon32Basket from '@divanru/icons/dist/32/basket';
import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import styles from './SelectorFabrics.module.css';

const Filters = loadable(() => import('../Filters'));

export type Step = 'preview' | 'order';

export interface SelectorFabricsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SelectorFabrics: FC<SelectorFabricsProps> = (props) => {
  const { className, page, ...restProps } = props;
  const [, { openModal, closeModal }] = useModals();

  //   избавиться от этого
  const orderFabrics = useOrderFabrics();

  const { isMobile, isMobileM, isDesktop } = useMedias();
  const [mainFormStyle, setMainFormStyle] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [allGroups, setAllGroups] = useState(false);
  const [gColors, setgColors] = useState([]);
  const [gTags, setgTags] = useState([]);
  const [gCollections, setgCollections] = useState([]);
  const [vseSamples, setVseSamples] = useState([
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

  // const { filterStore, addCheckbox, removeCheckbox, resetAll, resetGroup } = useFilters(
  //   orderFabrics.data.filters,
  // );
  // console.log('orderFabrics', orderFabrics);
  // console.log('filterStore', filterStore);

  function collectCollections(data: ConstructorRequestInfoData): ConstructorCollection[] {
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

  const orderFabrics2 = collectCollections(page);
  console.log('---orderFabrics2---', orderFabrics2);

  const colorsFilter = Object.values(page.tags.colors).map((color) => {
    return {
      parameterId: '40',
      type: 'variant',
      name: color.title,
      value: [color.id],
      meta: {
        color: color.code,
      },
    };
  });

  const typesFilter = Object.values(page.tags.types).map((type) => {
    return {
      parameterId: '10',
      type: 'variant',
      name: type.title,
      value: [type.id],
      meta: {
        color: '',
      },
    };
  });

  const collectionsFilter = Object.values(page.tags.collections).map((collection) => {
    return {
      parameterId: '20',
      type: 'variant',
      name: collection.title,
      value: [collection.id],
      meta: {
        color: '',
      },
    };
  });

  const filters = {
    filters: [
      {
        name: 'Цвет',
        theme: 'checkbox',
        items: [
          {
            theme: 'checkbox',
            parameterId: '40',
          },
        ],
      },
      {
        name: 'Свойства',
        theme: 'checkbox',
        items: [
          {
            theme: 'checkbox',
            parameterId: '10',
          },
        ],
      },
      {
        name: 'Коллекция',
        theme: 'checkbox',
        items: [
          {
            theme: 'checkbox',
            parameterId: '20',
          },
        ],
      },
    ],
    parameterValues: [...colorsFilter, ...typesFilter, ...collectionsFilter],
    parameters: {
      40: {
        name: 'Цвет',
        unit: '',
        default: [],
      },
      10: {
        name: 'Свойства',
        unit: '',
        default: [],
      },
      20: {
        name: 'Коллекция',
        unit: '',
        default: [],
      },
    },
  };

  const filtrator = useFiltrator({ id: 'xz', ...filters });
  console.log('filtrator', filtrator);

  const handleApplyFilters = useCallback(async () => {
    const filteredParameters = Filtrator.formatFiltersToObject();

    if (filteredParameters.parameters[40]) setgColors(filteredParameters.parameters[40]);
    if (filteredParameters.parameters[10]) setgTags(filteredParameters.parameters[10]);
    if (filteredParameters.parameters[20]) setgCollections(filteredParameters.parameters[20]);
    // window.history.pushState({}, '', url);
    closeModal('Filters');
  }, [closeModal]);

  const hanleOpenFilters = useCallback(
    (_e, selectedFilterId: string) => {
      openModal('Filters', { selectedFilterId, onApply: handleApplyFilters });
    },
    [handleApplyFilters, openModal],
  );

  // const selectedSamples = orderFabrics.data.selected.filter((selected) => !!selected.sample);
  const selectedSamples = vseSamples.filter((selected) => !!selected.sample);
  const disabled = selectedSamples.length < 1;
  const opened = selectedSamples.length > 0;

  const groups = useMemo(() => {
    // Фильтруем
    // let filteredCollections = [...orderFabrics.data.collections];
    let filteredCollections = [...orderFabrics2];
    const result: IConstructorGroup[] = [];

    // Фильтруем по цвету
    // const colors = filterStore.parameters.colors.default;
    // const colors = filtrator.selected.parameters[40]?.default || [];
    const colors = gColors;
    filteredCollections = filteredCollections.map((collection) => {
      if (!colors.length) return collection;

      return {
        ...collection,
        fabrics: collection.fabrics.filter((fabric) => colors.includes(fabric.tags.colorId)),
      };
    });

    // Фильтруем по свойствам
    // const tags = filterStore.parameters.tags.default;
    // const tags = filtrator.selected.parameters[10]?.default || [];
    const tags = gTags;
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
    // const collections = filtrator.selected.parameters[20]?.default || [];
    const collections = gCollections;
    console.log('filteredCollections', filteredCollections);

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
      collection.tags.typeIds.map((typeId) => groupTags.push(page.tags.types[typeId]));

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

    // // Обрезаем группы
    // if (isDesktop && !allGroups) {
    //   result = result.slice(0, 5);
    // }

    return result;
  }, [gCollections, gColors, gTags, orderFabrics2, page.tags.types]);

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
      // orderFabrics.data.selected.map(({ sample }) => {
      //   return sample && ids.push(sample.sampleId);
      // });
      vseSamples.map(({ sample }) => {
        return sample && ids.push(sample.sampleId);
      });

      return {
        ...data,
        'FabricsForm[fabricIds][]': ids,
      };
    },
    [vseSamples],
  );

  const handleResetGroup = useCallback((_e, params) => {
    // resetGroup(params);
    Filtrator.resetGroup(params);
  }, []);

  const handleResetAll = useCallback(() => {
    // resetAll();
    Filtrator.resetAll();
  }, []);

  const handleAddCheckbox = useCallback((_e, params) => {
    // addCheckbox(params);
    Filtrator.addCheckbox(params);
  }, []);

  const handleRemoveCheckbox = useCallback((_e, params) => {
    // removeCheckbox(params);
    Filtrator.removeCheckbox(params);
  }, []);

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

  const handleScrollMainForm = useCallback(() => {
    if (!refRight.current || !refForm.current) return;

    const boxContent = refRight.current.getBoundingClientRect();
    const boxInfo = refForm.current.getBoundingClientRect();

    const boxContentBottom = Math.round(boxContent.bottom);
    const boxInfoBottom = Math.round(boxInfo.bottom);

    if (boxInfo.y > 0 && boxContentBottom === boxInfoBottom) {
      setMainFormStyle({
        position: 'fixed',
        top: '0px',
      });
    } else if (boxContentBottom <= boxInfoBottom) {
      setMainFormStyle({
        position: 'absolute',
        bottom: '0px',
      });
    } else if (boxContent.y <= 0 && boxContentBottom > boxInfoBottom) {
      setMainFormStyle({
        position: 'fixed',
        top: '0px',
      });
    } else {
      setMainFormStyle(null);
    }
  }, []);

  const handleShowAllGroups = useCallback(() => {
    setAllGroups((prev) => !prev);
  }, []);

  const handleClickToMainForm = useCallback(() => {
    setStep('order');
  }, []);

  // Выбрать/снять образец ткани
  const toggleSelect = useCallback(
    ({ sample }) => {
      let newSelected = [...vseSamples];
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

      setVseSamples(newSelected);
      // updateData({ selected: newSelected });
    },
    [vseSamples],
  );

  // Отслеживаем скролл для позиционирования формы на десктопе
  useEffect(() => {
    function cleanup() {
      setMainFormStyle({});
      window.removeEventListener('scroll', handleScrollMainForm);
    }

    if (isDesktop) return cleanup;

    handleScrollMainForm();
    window.addEventListener('scroll', handleScrollMainForm);

    return cleanup;
  }, [handleScrollMainForm, isDesktop]);

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
        <Filters
          count={69}
          // groups={page.groups}
          // isMatrasyCategory={page.isMatrasyCategory}
          // key={path}
          onOpen={hanleOpenFilters}
          onChangeSort={handleApplyFilters}
        />
      </div>

      {/* <FabricFilters
        className={styles.fabrickFilters}
        filterStore={filterStore}
        onResetGroup={handleResetGroup}
        onResetAll={handleResetAll}
        onAddCheckbox={handleAddCheckbox}
        onRemoveCheckbox={handleRemoveCheckbox}
      /> */}

      <div className={styles.wrapperMainContent}>
        <div className={styles.left} ref={refLeft}>
          {groups.length > 0 ? (
            <div className={styles.wrapperCollections} ref={refCatalog}>
              {groups.map((group, index) => (
                <ConstructorGroup
                  className={styles.constructorGroup}
                  key={index}
                  group={group}
                  // groupView={isDesktop ? 'mobileDesktop' : 'fullDesktop'}
                  groupView='mobileDesktop'
                  slotCatalogItem={
                    <FabricExtraSample
                      className={styles.fabricExtraSample}
                      largeImage={!isMobileM}
                      sample={null}
                      refCatalog={refCatalog}
                      vse={vseSamples}
                      foo={toggleSelect}
                    />
                  }
                />
              ))}

              {/* {isDesktop && !allGroups && (
                <div className={styles.showAllGroups} onClick={handleShowAllGroups}>
                  <div>Показать все</div>
                  <Icon8ChevronDownThin width={10} className={styles.arrow} />
                </div>
              )} */}
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
            // style={mainFormStyle}
          >
            {/* {!isDesktop || step === 'order' ? (
              <div className={styles.wrapperFormOrder}>
                <Form
                  className={styles.samplesForm}
                  action='/site/fabrics-form'
                  validationSchemaUrl='/json-schema/fabrics-form'
                  transformDataBeforeSubmit={transformDataBeforeSubmit}
                  onSubmit={handleSubmit}
                  onResponse={handleResponse}
                  onError={handleError}
                >
                  <div className={styles.samplesFormTitle}>Ваши образцы</div>

                  <div className={styles.samplesFormContent}>
                    <div className={styles.examples}>
                      {orderFabrics.data.selected.map((item, index) => (
                        <FabricSample
                          key={index}
                          className={styles.example}
                          removable
                          sample={item.sample}
                        />
                      ))}
                    </div>

                    <div className={styles.inputs}>
                      <Input className={styles.input} placeholder='Имя' name='FabricsForm[name]' />
                      <InputPhone
                        className={styles.input}
                        placeholder='Телефон'
                        name='FabricsForm[phone]'
                      />
                    </div>
                  </div>

                  <div className={styles.samplesFormWrapperInfo}>
                    <Button
                      className={styles.submit}
                      type='submit'
                      // theme={disabled ? 'gray' : 'primary'}
                      waiting={waiting}
                      disabled={disabled}
                    >
                      Заказать ткани*
                    </Button>
                  </div>

                  {isDesktop && (
                    <div className={styles.samplesFormInfo}>
                      <div className={styles.samplesFormInfoRow}>
                        Подтверждая заказ, я соглашаюсь с условиями
                      </div>
                      <div>
                        <Link
                          target='_blank'
                          to='/static-page/privacy-policy'
                          // theme='secondary'
                          // decoration='underline'
                          className={styles.samplesFormInfoLink}
                        >
                          Политики конфиденциальности 1
                        </Link>
                      </div>
                    </div>
                  )}
                </Form>

                {!isDesktop && (
                  <div className={styles.samplesFormInfo}>
                    <div className={styles.samplesFormInfoRow}>
                      Подтверждая заказ, я соглашаюсь с условиями
                    </div>
                    <div>
                      <Link
                        target='_blank'
                        to='/static-page/privacy-policy'
                        // theme='secondary'
                        // decoration='underline'
                        className={styles.samplesFormInfoLink}
                      >
                        Политики конфиденциальности 2
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : ( */}

            {step === 'order' ? (
              <div />
            ) : (
              <div className={styles.mobileForm}>
                <ServicePageParagraphTitle
                  className={styles.titleForm}
                  title='Выберите до 5 образцов мебельных тканей'
                />

                <div className={styles.formContainer}>
                  <div className={styles.samplesFormContent}>
                    <div className={styles.examples}>
                      {/* {orderFabrics.data.selected.map((item, index) => ( */}
                      {vseSamples.map((item, index) => (
                        <FabricSample
                          key={index}
                          className={styles.exampleMobile}
                          removable
                          sample={item.sample}
                          foo={toggleSelect}
                        />
                      ))}
                    </div>

                    {!isMobile && (
                      <div className={styles.samplesFormInfoMobile}>
                        <div>Стоимость курьерской доставки образцов - от 300 ₽ </div>

                        <div className={styles.samplesFormInfoRow}>
                          {`Подтверждая заказ, я соглашаюсь с условиями `}
                          <Link
                            view='native'
                            to='/static-page/privacy-policy'
                            // theme='secondary'
                            //  decoration='underline'
                          >
                            Политики конфиденциальности
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.samplesFormWrapperInfo}>
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
                      // theme={disabled ? 'gray' : 'primary'}
                      waiting={waiting}
                      disabled={disabled}
                    >
                      Заказать ткани
                    </Button>
                  </div>

                  {isMobile && (
                    <div className={styles.samplesFormInfoMobile}>
                      <div>Стоимость курьерской доставки образцов - от 300 ₽ </div>

                      <div className={styles.samplesFormInfoRow}>
                        {`Подтверждая заказ, я соглашаюсь с условиями `}
                        <Link
                          view='native'
                          to='/static-page/privacy-policy'
                          // theme='secondary'
                          //  decoration='underline'
                        >
                          Политики конфиденциальности
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SelectorFabrics);
