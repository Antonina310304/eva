import React, { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
import cn from 'classnames';

import ServicePageParagraphTitle from '@Components/ServicePageParagraphTitle';
import useModals from '@Hooks/useModals';
import Form from '@UI/Form';
import FormItem from '@UI/FormItem';
import Input from '@UI/Input';
import InputPhone from '@Components/InputPhone';
import Textarea from '@UI/Textarea';
import Button from '@UI/Button';
import Upload from '@UI/Upload';
import MainSelect from '@UI/MainSelect';
import styles from './QualityDepartmentForm.module.css';

export interface QualityDepartmentFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const packCondition = [
  {
    id: 'packGood',
    name: 'Упаковка без повреждений',
    title: 'Упаковка без повреждений',
    selected: true,
  },
  {
    id: 'packBroken',
    name: 'Упаковка повреждена',
    title: 'Упаковка повреждена',
    selected: false,
  },
];

const packConditionDetails = [
  {
    id: 'packCrumpled',
    name: 'Замятие',
    title: 'Замятие',
    selected: false,
  },
  {
    id: 'packWet',
    name: 'Намокание',
    title: 'Намокание',
    selected: false,
  },
  {
    id: 'packDyrty',
    name: 'Загрязнение',
    title: 'Загрязнение',
    selected: false,
  },
  {
    id: 'packCut',
    name: 'Порез',
    title: 'Порез',
    selected: false,
  },
  {
    id: 'packRupture',
    name: 'Разрыв',
    title: 'Разрыв',
    selected: false,
  },
  {
    id: 'packPuncture',
    name: 'Прокол',
    title: 'Прокол',
    selected: false,
  },
  {
    id: 'packDefect',
    name: 'Упаковка повреждена в месте дефекта',
    title: 'Упаковка повреждена в месте дефекта',
    selected: false,
  },
  {
    id: 'packOther',
    name: 'Другое',
    title: 'Другое',
    selected: false,
  },
];

const QualityDepartmentForm: FC<QualityDepartmentFormProps> = (props) => {
  const { className, ...restProps } = props;
  const [, { openModal }] = useModals();
  const [waiting, setWaiting] = useState(false);
  const [checkedPackCondition, setCheckedPackCondition] = useState(packCondition[0]);
  const [checkedPackConditionDetails, setCheckedPackConditionDetails] = useState([]);
  const [uploadError, setUploadError] = useState();

  const transformDataBeforeSubmit = useCallback(
    (prevData) => {
      let newData = { ...prevData };

      if (checkedPackCondition.id === 'packGood') {
        newData = { ...prevData, packConditionDetails: '', packConditionText: '' };
      }

      return newData;
    },
    [checkedPackCondition.id],
  );

  const handleSubmit = useCallback(() => {
    setWaiting(true);
  }, []);

  const handleError = useCallback(() => {
    setWaiting(false);

    openModal('Info', {
      view: 'error',
      title: 'Ошибка!',
      text: 'Сервер временно недоступен.',
    });
  }, [openModal]);

  const handleResponse = useCallback(
    (response) => {
      setWaiting(false);

      if (response.status === 'success') {
        openModal('Info', {
          view: 'success',
          title: 'Спасибо! ',
          text: 'Ваше сообщение отправлено.',
        });
      } else {
        handleError();
      }
    },
    [handleError, openModal],
  );

  const handleChangeParameter = useCallback((_e, items) => {
    setCheckedPackCondition(items[0]);
  }, []);

  const handleChangeUploadError = useCallback((e, err) => {
    setUploadError(err);
  }, []);

  const handleCheckedPackConditions = useCallback((_e, checkedItems) => {
    setCheckedPackConditionDetails(checkedItems);
  }, []);

  return (
    <div {...restProps} className={cn(styles.qualityDepartmentForm, className)}>
      <ServicePageParagraphTitle
        className={styles.paragraphTitle}
        title='Заполните форму обращения'
      />

      <Form
        action='/site/quality-department-send-message'
        method='POST'
        validationSchemaUrl='/json-schema/quality-department-form.json'
        disabled={!!uploadError}
        transformDataBeforeSubmit={transformDataBeforeSubmit}
        onSubmit={handleSubmit}
        onResponse={handleResponse}
        onError={handleError}
      >
        <div className={styles.block}>
          <div className={styles.column}>
            <FormItem className={styles.formItem}>
              <Input name='name' placeholder='Ф.И.О' />
            </FormItem>

            <FormItem className={styles.formItem}>
              <InputPhone name='phone' placeholder='Телефон' />
            </FormItem>
          </div>

          <div className={styles.column}>
            <FormItem className={styles.formItem}>
              <Input name='checkNumber' placeholder='Номер товарного чека' />
            </FormItem>

            <FormItem className={styles.formItem}>
              <Input name='productName' placeholder='Наименование товара' />
            </FormItem>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.column}>
            <FormItem className={styles.formItem}>
              <MainSelect
                title='Состояние упаковки при приеме товара'
                name='packCondition'
                className={styles.select}
                items={packCondition}
                defaultChecked={packCondition.find((option) => option.selected)}
                onChangeSelected={handleChangeParameter}
              />
            </FormItem>

            {checkedPackCondition.id === 'packBroken' && (
              <FormItem
                className={styles.formItem}
                bottom={
                  <div className={styles.bottomStyle}>
                    Отметьте, при наличии, повреждения упаковки
                  </div>
                }
              >
                <MainSelect
                  title='Тип повреждения упаковки'
                  name='packConditionDetails'
                  mode='multiple'
                  className={styles.select}
                  items={packConditionDetails}
                  onChangeSelected={handleCheckedPackConditions}
                />
              </FormItem>
            )}

            <FormItem
              className={styles.formItem}
              hidden={
                checkedPackCondition.id === 'packGood' ||
                !checkedPackConditionDetails.find((condition) => condition.id === 'packOther')
              }
              bottom={
                <div className={styles.bottomStyle}>
                  Опишите состояние упаковки при получении товара
                </div>
              }
            >
              <Input name='packConditionText' placeholder='Состояние упаковки' />
            </FormItem>

            <FormItem
              className={styles.formItem}
              bottom={
                <div className={styles.bottomStyle}>
                  Укажите те части товара, где были обнаружены дефекты
                </div>
              }
            >
              <Input
                name='defectingProductPart'
                placeholder='Часть изделия, на которой обнаружен дефект'
              />
            </FormItem>
          </div>

          <div className={styles.column}>
            <FormItem
              className={styles.formItem}
              bottom={
                <div className={styles.bottomStyle}>
                  Напишите, что вас не устраивает в качестве товара (услуг).
                </div>
              }
            >
              <Textarea
                name='pretension'
                className={cn(styles.pretension, styles.textarea)}
                placeholder='Претензия'
              />
            </FormItem>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.column}>
            <FormItem
              className={styles.formItem}
              bottom={
                <div className={styles.bottomStyle}>
                  Опишите характер дефекта. При каких условиях был обнаружен дефект? Каким образом
                  влияет выявленный дефект на эксплуатацию товара?
                </div>
              }
            >
              <Textarea
                name='defectDescription'
                className={cn(styles.defectDescription, styles.textarea)}
                placeholder='Описание дефекта (дефектов)'
              />
            </FormItem>
          </div>

          <div className={styles.column}>
            <FormItem
              className={styles.formItem}
              bottom={
                <div className={styles.bottomStyle}>
                  Как бы вы хотели, чтобы компания решила ситуацию?
                </div>
              }
            >
              <Textarea
                name='requirements'
                className={cn(styles.requirements, styles.textarea)}
                placeholder='Требование покупателя'
              />
            </FormItem>
          </div>
        </div>

        <div className={cn(styles.block, styles.uploadBlock)}>
          <div className={cn(styles.column, styles.uploadWrapper)}>
            <FormItem className={styles.formItem}>
              <Upload
                multiple
                view='vertical'
                name='files[]'
                maxCount={8}
                maxSizePerFile={10 * 1024 * 1024}
                accept='image/*, video/*'
                title='Прикрепить фото/видео'
                description='.jpg, .jpeg, .png, .mp4, .mov, .wmv, .avi и mpg. менее 10 MB'
                onChangeError={handleChangeUploadError}
                className={styles.upload}
                insideUploadedElements
              />
            </FormItem>
          </div>

          <div className={cn(styles.column, styles.filesInfoWrapper)}>
            <FormItem className={styles.formItem}>
              <>
                <div className={styles.listTitle}>
                  К данному обращению необходимо приложить следующие материалы:
                </div>

                <ul className={styles.list}>
                  <li className={styles.listItem}>- фото товара в упаковке;</li>
                  <li className={styles.listItem}>- фото повреждений упаковки (при наличии);</li>
                  <li className={styles.listItem}>
                    - фото товарного чека (акта приема-передачи, УПД) с подписью покупателя;
                  </li>
                  <li className={styles.listItem}>- фото дефекта с расстояния 1 метра;</li>
                  <li className={styles.listItem}>
                    - фото дефекта с расстояния 20-30 сантиметров;
                  </li>
                  <li className={styles.listItem}>
                    - видео, если необходимо продемонстрировать работу механизмов.
                  </li>
                </ul>
              </>
            </FormItem>
          </div>
        </div>

        <div className={styles.footer}>
          <Button type='submit' waiting={waiting}>
            Отправить заявку
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default memo(QualityDepartmentForm);
