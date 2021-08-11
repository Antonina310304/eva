import React, { useCallback, useEffect, useState, memo, FC } from 'react';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import Button from '@UI/Button';
import Input from '@UI/Input';
import Form from '@UI/Form';
import FormItem from '@UI/FormItem';
import analytics from '@Utils/analytics';
import { ProductData } from '@Types/Product';
import styles from '../../Modals/PriceDropModal/PriceDropModal.module.css';

export interface PriceDropFormProps {
  className?: string;
  product: ProductData;
}

const PriceDropForm: FC<PriceDropFormProps> = (props) => {
  const { className, product, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [, { openModal }] = useModals();

  const handleBeforeSubmit = useCallback(
    (e, data) => {
      e.preventDefault();
      setLoading(true);

      try {
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
                  divanru: `${product.id}`,
                },
              },
              pricePerItem: `${product.price.actual}`,
            },
          },
        });

        openModal('Info', {
          view: 'success',
          title: 'Отлично!',
          text: 'Как только цена станет ниже, мы пришлем вам письмо.',
        });

        (window.dataLayer = window.dataLayer || []).push({
          eCategory: 'priceDropForm',
          eAction: 'send',
          eLabel: `${product.id}`,
          eNI: false,
          event: 'GAEvent',
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        openModal('Info', {
          view: 'error',
          title: 'Произошла ошибка',
          text: 'Пожалуйста, повторите попытку позже.',
        });
      } finally {
        setLoading(false);
      }
    },
    [product, openModal],
  );

  useEffect(() => {
    (window.dataLayer = window.dataLayer || []).push({
      eCategory: 'priceDropForm',
      eAction: 'open',
      eLabel: `${product.id}`,
      eNI: false,
      event: 'GAEvent',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      {...restProps}
      className={cn(styles.form, className)}
      action='/'
      validationSchemaUrl='/json-schema/price-reduction-subscription-form.json'
      onBeforeSubmit={handleBeforeSubmit}
    >
      <FormItem>
        <Input type='text' placeholder='E-mail' name='PriceReductionSubscriptionForm[email]' />
      </FormItem>

      <Button className={styles.button} type='submit' waiting={loading}>
        Подписаться
      </Button>
    </Form>
  );
};

export default memo(PriceDropForm);
