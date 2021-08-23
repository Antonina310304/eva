import React, { FC, HTMLAttributes, useCallback, useState } from 'react';

import Input from '@UI/Input/Input';

import Form from '@UI/Form';
import cn from 'classnames';
import FormItem from '@UI/FormItem/FormItem';
import styles from './SubscriptionForm.module.css';

export interface SubscriptionFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SubscriptionForm: FC<SubscriptionFormProps> = ({ className }) => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log(`Подписка оформлена на email ${email}`);
    setEmail('');
  }, [email]);

  return (
    <Form
      className={cn(styles.subscriptionForm, className)}
      action='/subscribe'
      onSubmit={handleSubmit}
    >
      <div className={styles.subscriptionWrapper}>
        <FormItem>
          <Input
            className={styles.subscriptionFormInput}
            type='text'
            placeholder='email'
            name='Subscription[email]'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
