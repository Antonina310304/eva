import React, { FC, HTMLAttributes, useCallback } from 'react';
import cn from 'classnames';

import Input from '@UI/Input/Input';
import Form from '@UI/Form';
import useModals from '@Hooks/useModals';
import styles from './SubscriptionForm.module.css';

export interface SubscriptionFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SubscriptionForm: FC<SubscriptionFormProps> = (props) => {
  const { className } = props;
  const [, { openModal }] = useModals();

  const handleSubmit = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  return (
    <Form
      className={cn(styles.subscriptionForm, className)}
      action='/subscribe'
      onSubmit={handleSubmit}
    >
      <div className={styles.wrapper}>
        <Input
          className={styles.input}
          wide
          rounded
          view='plain'
          type='text'
          placeholder='email'
          name='Subscription[email]'
        />
        <button className={styles.button} type='submit'>
          Отправить
        </button>
      </div>
    </Form>
  );
};

export default SubscriptionForm;
