import React, { FC, HTMLAttributes, useCallback, useState } from 'react';

import Input from '@UI/Input/Input';

import Form from '@UI/Form';
import cn from 'classnames';
import FormItem from '@UI/FormItem/FormItem';
import useModals from '@Hooks/useModals';
import styles from './SubscriptionForm.module.css';

export interface SubscriptionFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SubscriptionForm: FC<SubscriptionFormProps> = ({ className }) => {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [, { openModal }] = useModals();

  const handleSubmit = useCallback(() => {
    setLoading(true);
  }, []);

  function uploadError() {}

  const handleError = useCallback(() => {
    openModal('Info', {
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });
  }, [openModal]);

  const handleResponse = useCallback(
    (response) => {
      setLoading(!loading);

      if (response.errors && response.errors.length > 0) {
        setServerErrors([response.errors]);

        serverErrors.forEach(function () {});
        return;
      }

      if (response.ok) {
        setLoading(true);
      } else {
        handleError();
      }
    },
    [loading, serverErrors, handleError],
  );

  return (
    <Form
      className={cn(styles.subscriptionForm, className)}
      action='/subscribe'
      disabled={!!uploadError}
      onSubmit={handleSubmit}
      onResponse={handleResponse}
      onError={handleError}
    >
      <div className={styles.subscriptionWrapper}>
        <FormItem>
          <Input
            className={styles.subscriptionFormInput}
            type='text'
            placeholder='email'
            name='Subscription[email]'
            defaultValue=''
          />
        </FormItem>
        <button className={styles.subscriptionFormButton} type='submit'>
          Отправить
        </button>
      </div>
    </Form>
  );
};

export default SubscriptionForm;
