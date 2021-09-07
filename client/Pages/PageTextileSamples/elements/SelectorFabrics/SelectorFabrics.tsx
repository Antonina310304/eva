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
import styles from './SelectorFabrics.module.css';

export type Step = 'preview' | 'order';

export interface SelectorFabricsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SelectorFabrics: FC<SelectorFabricsProps> = (props) => {
  const { className, ...restProps } = props;
  const [, { openModal }] = useModals();
  const orderFabrics = useOrderFabrics();
  const { isMobile, isMobileL } = useMedias();
  const [mainFormStyle, setMainFormStyle] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [allGroups, setAllGroups] = useState(false);
  const [step, setStep] = useState<Step>('preview');
  const refRight = useRef(null);
  const refForm = useRef(null);
  const refLeft = useRef(null);
  const refCatalog = useRef<HTMLDivElement>(null);

  const { filterStore, addCheckbox, removeCheckbox, resetAll, resetGroup } = useFilters(
    orderFabrics.data.filters,
  );

  const selectedSamples = orderFabrics.data.selected.filter((selected) => !!selected.sample);
  const disabled = selectedSamples.length < 1;
  const opened = selectedSamples.length > 0;

  const groups = useMemo(() => {
    // Фильтруем
    let filteredCollections = [...orderFabrics.data.collections];
    let result: IConstructorGroup[] = [];

    filteredCollections = [...orderFabrics.data.collections];

    // Фильтруем по цвету
    const colors = filterStore.parameters.colors.default;
    filteredCollections = filteredCollections.map((collection) => {
      if (!colors.length) return collection;

      return {
        ...collection,
        fabrics: collection.fabrics.filter((fabric) => colors.includes(fabric.tags.colorId)),
      };
    });

    // Фильтруем по свойствам
    const tags = filterStore.parameters.tags.default;
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

    // Оставляем только те коллекции, в которых есть ткани и сортируем
    filteredCollections = filteredCollections.filter((collection) => collection.fabrics.length > 0);
    filteredCollections = filteredCollections.sort((ca, cb) => ca.sort - cb.sort);

    // Собираем в группы
    filteredCollections.forEach((collection) => {
      const groupTags = [];
      collection.tags.typeIds.map((typeId) => groupTags.push(orderFabrics.data.tags.types[typeId]));

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

    // Обрезаем группы
    if (isMobileL && !allGroups) {
      result = result.slice(0, 5);
    }

    return result;
  }, [allGroups, filterStore.parameters, isMobileL, orderFabrics.data]);

  const transformDataBeforeSubmit = useCallback(
    (data) => {
      const ids = [];
      orderFabrics.data.selected.map(({ sample }) => {
        return sample && ids.push(sample.sampleId);
      });

      return {
        ...data,
        'FabricsForm[fabricIds][]': ids,
      };
    },
    [orderFabrics.data.selected],
  );

  const handleResetGroup = useCallback(
    (_e, params) => {
      resetGroup(params);
    },
    [resetGroup],
  );

  const handleResetAll = useCallback(() => {
    resetAll();
  }, [resetAll]);

  const handleAddCheckbox = useCallback(
    (_e, params) => {
      addCheckbox(params);
    },
    [addCheckbox],
  );

  const handleRemoveCheckbox = useCallback(
    (_e, params) => {
      removeCheckbox(params);
    },
    [removeCheckbox],
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
        message: 'Благодарим за выбор divan.ru. Наш оператор свяжется с вами в ближайшее время.',
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

  // Отслеживаем скролл для позиционирования формы на десктопе
  useEffect(() => {
    function cleanup() {
      setMainFormStyle({});
      window.removeEventListener('scroll', handleScrollMainForm);
    }

    if (isMobileL) return cleanup;

    handleScrollMainForm();
    window.addEventListener('scroll', handleScrollMainForm);

    return cleanup;
  }, [handleScrollMainForm, isMobileL]);

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

      <FabricFilters
        className={styles.fabrickFilters}
        filterStore={filterStore}
        onResetGroup={handleResetGroup}
        onResetAll={handleResetAll}
        onAddCheckbox={handleAddCheckbox}
        onRemoveCheckbox={handleRemoveCheckbox}
      />

      <div className={styles.wrapperMainContent}>
        <div className={styles.left} ref={refLeft}>
          {groups.length > 0 ? (
            <div className={styles.wrapperCollections} ref={refCatalog}>
              {groups.map((group, index) => (
                <ConstructorGroup
                  className={styles.constructorGroup}
                  key={index}
                  group={group}
                  groupView={isMobileL ? 'mobileDesktop' : 'fullDesktop'}
                  slotCatalogItem={
                    <FabricExtraSample
                      className={styles.fabricExtraSample}
                      largeImage={!isMobile}
                      sample={null}
                      refCatalog={refCatalog}
                    />
                  }
                />
              ))}

              {isMobileL && !allGroups && (
                <div className={styles.showAllGroups} onClick={handleShowAllGroups}>
                  <div>Показать все</div>
                  <Icon8ChevronDownThin width={10} className={styles.arrow} />
                </div>
              )}
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
            style={mainFormStyle}
          >
            {!isMobileL || step === 'order' ? (
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

                  {isMobileL && (
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
                          Политики конфиденциальности
                        </Link>
                      </div>
                    </div>
                  )}
                </Form>

                {!isMobileL && (
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
                        Политики конфиденциальности
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.mobileForm}>
                <div className={styles.samplesFormContent}>
                  <div className={styles.examples}>
                    {orderFabrics.data.selected.map((item, index) => (
                      <FabricSample
                        key={index}
                        className={styles.exampleMobile}
                        removable
                        sample={item.sample}
                      />
                    ))}
                    <Button
                      className={styles.mobileBtn}
                      // theme={disabled ? 'gray' : 'primary'}
                      disabled={disabled}
                      onClick={handleClickToMainForm}
                    >
                      <Icon32Basket className={styles.basket} />
                    </Button>
                  </div>
                </div>

                <div className={styles.samplesFormInfoMobile}>
                  <div className={styles.samplesFormInfoRow}>
                    {`Подтверждая заказ, я соглашаюсь с условиями `}
                    <Link
                      to='/static-page/privacy-policy'
                      // theme='secondary'
                      //  decoration='underline'
                    >
                      Политики конфиденциальности
                    </Link>
                  </div>
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
