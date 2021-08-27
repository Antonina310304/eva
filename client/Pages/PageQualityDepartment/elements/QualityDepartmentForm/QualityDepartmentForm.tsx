import React, { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
import cn from 'classnames';

import ParagraphTitle from '@Pages/PageCredit/elements/ParagraphTitle';
import useModals from '@Hooks/useModals';
import Form from '@UI/Form';
import FormItem from '@UI/FormItem';
import Input from '@UI/Input';
import Textarea from '@UI/Textarea';
import MainSelect from '@UI/MainSelect';
import Select, { SelectProps, SelectItemData } from '@UI/Select';
import SampleOption from '@UI/MainSelect/elems/SampleOption';
import Button from '@UI/Button';
import Upload from '@UI/Upload';
import MySelect1 from '../MySelect1';
import MySelect2 from '../MySelect2';
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

  //
  const onSubmit = useCallback(() => {
    setWaiting(true);
  }, []);

  //
  const onError = useCallback(() => {
    setWaiting(false);

    openModal('Info', {
      view: 'error',
      title: 'Ошибка!',
      text: 'Сервер временно недоступен.',
    });
  }, [openModal]);

  //
  const onResponse = useCallback(
    (response) => {
      setWaiting(false);

      if (response.status === 'success') {
        openModal('Info', {
          view: 'success',
          title: 'Спасибо! ',
          text: 'Ваше сообщение отправлено.',
        });
      } else {
        onError(response);
      }
    },
    [onError, openModal],
  );

  const handleOpenConstructor = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  const handleCheckedPackConditionsFirst = useCallback((e, data) => {
    console.log('handleCheckedPackConditionsFirst');

    setCheckedPackCondition(data);
  }, []);

  const handleChangeParameter = useCallback((_e, items) => {
    setCheckedPackCondition(items[0]);
  }, []);

  const onChangeUploadError = useCallback((e, err) => {
    setUploadError(err);
  }, []);

  const handleCheckedPackConditions = useCallback((checkedItems) => {
    console.log('checkedItems', checkedItems);
    setCheckedPackConditionDetails(checkedItems);
  }, []);

  const handleUncheckedPackConditions = useCallback((e, item) => {
    setCheckedPackConditionDetails((prev) => {
      const itemIndex = prev.findIndex(({ id }) => item.id === id);
      const newItems = [...prev];

      newItems.splice(itemIndex, 1);

      return newItems;
    });
  }, []);

  return (
    <div {...restProps} className={cn(styles.qualityDepartmentForm, className)}>
      <ParagraphTitle className={styles.paragraphTitle} title='Заполните форму обращения' />

      <Form
        action='/site/quality-department-send-message'
        method='POST'
        validationSchemaUrl='/json-schema/quality-department-form.json'
        disabled={!!uploadError}
        transformDataBeforeSubmit={transformDataBeforeSubmit}
        onSubmit={onSubmit}
        onResponse={onResponse}
        onError={onError}
      >
        <div className={styles.block}>
          <div className={styles.column}>
            <FormItem>
              <Input name='name' placeholder='Ф.И.О' />
            </FormItem>

            <FormItem>
              <Input name='phone' mask='+7 (999) 999-99-99' placeholder='Телефон' />
            </FormItem>
          </div>

          <div className={styles.column}>
            <FormItem>
              <Input name='checkNumber' placeholder='Номер товарного чека' />
            </FormItem>

            <FormItem>
              <Input name='productName' placeholder='Наименование товара' />
            </FormItem>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.column}>
            <FormItem>
              <MySelect1
                title='Состояние упаковки при приеме товара'
                name='packCondition'
                withoutItems
                className={styles.select}
                items={packCondition}
                onChangeSelected={handleChangeParameter}
              />
            </FormItem>

            <FormItem
              hidden={checkedPackCondition.id === 'packGood'}
              bottom='Отметьте, при наличии, повреждения упаковки'
              cnBottom={styles.bottomStyle}
            >
              <MySelect2
                title='Тип повреждения упаковки'
                name='packConditionDetails'
                withoutItems
                className={styles.select}
                items={packConditionDetails}
                getCheckedItems={handleCheckedPackConditions}
              />
            </FormItem>

            <FormItem
              hidden={
                checkedPackCondition.id === 'packGood' ||
                !checkedPackConditionDetails.find((condition) => condition.id === 'packOther')
              }
              bottom='Опишите состояние упаковки при получении товара'
              cnBottom={styles.bottomStyle}
            >
              <Input name='packConditionText' placeholder='Состояние упаковки' />
            </FormItem>

            <FormItem
              bottom='Укажите те части товара, где были обнаружены дефекты'
              cnBottom={styles.bottomStyle}
            >
              <Input
                name='defectingProductPart'
                placeholder='Часть изделия, на которой обнаружен дефект'
              />
            </FormItem>

            <FormItem
              bottom='Опишите характер дефекта. При каких условиях был обнаружен дефект? Каким образом влияет выявленный дефект на эксплуатацию товара?'
              cnBottom={styles.bottomStyle}
            >
              <Textarea
                name='defectDescription'
                className={styles.defectDescription}
                placeholder='Описание дефекта (дефектов)'
                resizeDisable
              />
            </FormItem>
          </div>
          <div className={styles.column}>
            <FormItem
              bottom='Напишите, что вас не устраивает в качестве товара (услуг).'
              cnBottom={styles.bottomStyle}
            >
              <Textarea
                name='pretension'
                className={styles.pretension}
                placeholder='Претензия'
                resizeDisable
              />
            </FormItem>

            <FormItem
              bottom='Как бы вы хотели, чтобы компания решила ситуацию?'
              cnBottom={styles.bottomStyle}
            >
              <Textarea
                name='requirements'
                className={styles.requirements}
                placeholder='Требование покупателя'
                resizeDisable
              />
            </FormItem>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.column}>
            <FormItem>
              <Upload
                multiple
                view='vertical'
                name='files[]'
                maxCount={8}
                maxSizePerFile={10 * 1024 * 1024}
                accept='image/*, video/*'
                title='Прикрепить фото/видео'
                description='.jpg, .jpeg, .png, .mp4, .mov, .wmv, .avi и mpg. менее 10 MB'
                onChangeError={onChangeUploadError}
                insideUploadedElements
              />
            </FormItem>
          </div>
          <div className={styles.column}>
            <FormItem>
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
