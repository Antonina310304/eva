import React, { useCallback, useState, memo, FC } from 'react';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import Button from '@UI/Button';
import Input from '@UI/Input';
import Form from '@UI/Form';
import FormItem from '@UI/FormItem';
import analytics from '@Utils/analytics';

import styles from './PriceDropModal.module.css';

export interface PriceDropFormProps {
  className?: string;
  id: string;
}

const PriceDropForm: FC<PriceDropFormProps> = (props) => {
  const { className, id, price, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [, { openModal }] = useModals();

  const handleSubmit = useCallback(
    (_e, data) => {
      setLoading(true);
      analytics.directCrm('async', {
        operation: 'SubscriptionToPriceUpdate',
        data: {
          customer: {
            email: data['PriceReductionSubscriptionForm[email]'],
            subscriptions: [
              {
                brand: 'Divan',
                pointOfContact: 'Email',
              },
            ],
          },
          addProductToList: {
            product: {
              ids: {
                divanru: `${id}`,
              },
            },
            pricePerItem: `${price}`,
          },
        },
        onSuccess() {
          setLoading(false);
          openModal('Info', {
            title: 'Отлично!',
            message: 'Как только цена станет ниже, мы пришлем вам письмо.',
          });

          (window.dataLayer = window.dataLayer || []).push({
            eCategory: 'priceDropForm',
            eAction: 'send',
            eLabel: `${id}`,
            eNI: false,
            event: 'GAEvent',
          });
        },
        onError() {
          setLoading(false);
          openModal('Info', {
            title: 'Произошла ошибка',
            text: 'Пожалуйста, повторите попытку позже.',
          });
        },
      });
    },
    [id, price, openModal],
  );

  return (
    <Form
      {...restProps}
      className={cn(styles.form, [className])}
      action='/'
      validationSchemaUrl='/json-schema/price-reduction-subscription-form.json'
      serverErrors={serverErrors}
      onSubmit={handleSubmit}
    >
      <FormItem>
        <Input type='text' placeholder='E-mail' name='PriceReductionSubscriptionForm[email]' />
      </FormItem>
      <Button className={styles.button} type='button' waiting={loading}>
        Подписаться
      </Button>
    </Form>
  );
};

export default memo(PriceDropForm);
