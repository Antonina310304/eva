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
  onClose?: () => void;
  onSendReview?: (item: any) => void;
}

const SendReviewForm: FC<SendReviewFormProps> = (props) => {
  const { className, product, orderId, onClose, onSendReview } = props;
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [, { openModal }] = useModals();
  const { isMobile } = useMedias();
  const [uploadError, setUploadError] = useState();
  const textAreaRef = useRef(null);

  const transformDataBeforeSubmit = useCallback((data) => {
    const fileField = 'SendReviewForm[file]';
    const isFileEmpty = data[fileField].name === '' || data[fileField] === '';

    return {
      ...data,
      [fileField]: isFileEmpty ? {} : data[fileField],
    };
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);
  }, []);

  const handleError = useCallback(() => {
    onClose();
    // openModal('info', {
    //   title: 'Произошла ошибка',
    //   text: 'Пожалуйста, повторите попытку позже.',
    // });
  }, [onClose]);

  const handleResponse = useCallback(
    (response) => {
      setLoading(false);

      if (response.errors && response.errors.length > 0) {
        setServerErrors(response.errors);
        return;
      }

      if (response.ok) {
        onClose();
        if (response.data.view === 'YandexMarket') {
          textAreaRef.current.select();
          document.execCommand('copy');

          // openModal('ya-market', {
          //   title: 'Ура, мы очень рады!',
          //   message: [
          //     'Также можно поделиться отзывом на Яндекс.Маркет.',
          //     'Мы уже скопировали текст вашего отзыва, после перехода его можно будет просто вставить.',
          //   ],
          //   cta: 'Оставить отзыв',
          //   url: 'https://market.yandex.ru/shop/309964/reviews/add',
          // });
        } else {
          // openModal('success-message', {
          //   title: 'Спасибо!',
          //   message: 'Ваше сообщение отправлено.',
          // });
        }

        if (!onSendReview) return;

        if (!response.data.review.text) return;

        onSendReview(response.data.review);
      } else {
        handleError();
      }
    },
    [handleError, onClose, onSendReview],
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
      <input hidden name='SendReviewForm[id]' value={product.id} />

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
        <Button className={styles.buy} type='submit'>
          Оставить отзыв
        </Button>
        <Button className={styles.cancel} type='button' theme='linkSecondary' onClick={onClose}>
          Отменить
        </Button>
      </div>
    </Form>
  );
};

export default memo(SendReviewForm);
