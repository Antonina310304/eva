import React, { memo, useCallback, useState, FC, useRef } from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import useModals from '@Hooks/useModals';
import Button from '@UI/Button';
import Input from '@UI/Input';
import Textarea from '@UI/Textarea';
import Upload from '@UI/Upload';
import Form from '@UI/Form';
import FormItem from '@UI/FormItem';
import { ProductData } from '@Types/Product';
import RatingItem from './elems/RatingItem';
import styles from './SendReviewForm.module.css';

export interface SendReviewFormProps {
  className?: string;
  orderId?: string;
  product: ProductData;
  onCancel?: () => void;
  onSuccess?: (review: any) => void;
}

const SendReviewForm: FC<SendReviewFormProps> = (props) => {
  const { className, product, orderId, onCancel, onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [, { openModal }] = useModals();
  const { isMobile } = useMedias();
  const [uploadError, setUploadError] = useState();
  const textAreaRef = useRef(null);

  const transformDataBeforeSubmit = useCallback((data) => {
    const idField = 'SendReviewForm[id]';
    const fileField = 'SendReviewForm[file]';
    const qualityField = 'SendReviewForm[quality]';
    const serviceField = 'SendReviewForm[service]';
    const isFileEmpty = data[fileField].name === '' || data[fileField] === '';

    return {
      ...data,
      [fileField]: isFileEmpty ? {} : data[fileField],
      [idField]: +data[idField],
      [qualityField]: +data[qualityField],
      [serviceField]: +data[serviceField],
    };
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);
  }, []);

  const handleError = useCallback(() => {
    openModal('Info', {
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });
  }, [openModal]);

  const handleResponse = useCallback(
    (response) => {
      setLoading(false);

      if (response.errors && response.errors.length > 0) {
        setServerErrors(response.errors);
        return;
      }

      if (response.ok) {
        if (response.data.view === 'YandexMarket') {
          textAreaRef.current.select();
          document.execCommand('copy');

          openModal('YandexMarket', {
            title: 'Ура, мы очень рады!',
            message: [
              'Также можно поделиться отзывом на Яндекс.Маркет.',
              'Мы уже скопировали текст вашего отзыва, после перехода его можно будет просто вставить.',
            ],
            cta: {
              text: 'Оставить отзыв',
              link: 'https://market.yandex.ru/shop/309964/reviews/add',
            },
          });
        } else {
          openModal('Info', {
            title: 'Спасибо!',
            message: 'Ваше сообщение отправлено.',
          });
        }

        if (!onSuccess) return;
        if (!response.data.review.text) return;

        onSuccess(response.data.review);
      } else {
        handleError();
      }
    },
    [handleError, onSuccess, openModal],
  );

  const handleChangeUploadError = useCallback((e, err) => {
    setUploadError(err);
  }, []);

  return (
    <Form
      className={cn(styles.form, className)}
      action='/site/send-review'
      validationSchemaUrl='/json-schema/send-review-form.json'
      transformDataBeforeSubmit={transformDataBeforeSubmit}
      serverErrors={serverErrors}
      disabled={!!uploadError}
      onSubmit={handleSubmit}
      onResponse={handleResponse}
      onError={handleError}
    >
      <input hidden name='SendReviewForm[id]' defaultValue={product.id} />

      <div className={styles.main}>
        <div className={styles.inputs}>
          <FormItem>
            <Input
              type='text'
              placeholder='Номер заказа'
              name='SendReviewForm[order]'
              defaultValue={orderId || null}
            />
          </FormItem>

          <FormItem>
            <Textarea
              className={styles.text}
              placeholder='Текст отзыва'
              name='SendReviewForm[text]'
              ref={textAreaRef}
            />
          </FormItem>

          <FormItem>
            <Input type='text' placeholder='Ваше имя' name='SendReviewForm[name]' />
          </FormItem>
        </div>

        <Upload
          className={styles.files}
          view={isMobile ? null : 'vertical'}
          name='SendReviewForm[file]'
          maxSizePerFile={10 * 1024 * 1024}
          accept='.png, .jpg, .jpeg'
          title='Не забудьте добавить фото'
          description='.jpg, .jpeg, .png менее 10 MB'
          capture
          onChangeError={handleChangeUploadError}
        />
      </div>

      <div className={styles.ratings}>
        <RatingItem
          className={styles.ratingItem}
          editable
          defaultValue={5}
          label='Оцените товар'
          name='SendReviewForm[quality]'
        />
        <RatingItem
          className={styles.ratingItem}
          editable
          defaultValue={5}
          label='Оцените сервис'
          name='SendReviewForm[service]'
        />
      </div>

      <div className={styles.actions}>
        <Button className={cn(styles.action, styles.buy)} type='submit' waiting={loading}>
          Оставить отзыв
        </Button>
        <Button className={styles.action} type='button' theme='linkSecondary' onClick={onCancel}>
          Отменить
        </Button>
      </div>
    </Form>
  );
};

export default memo(SendReviewForm);
