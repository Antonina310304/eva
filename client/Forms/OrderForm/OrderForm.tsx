import React, { useCallback, useState, memo, FC } from 'react';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import Button from '@UI/Button';
import Input from '@UI/Input';
import Form from '@UI/Form';
import FormItem from '@UI/FormItem';
import analytics from '@Utils/analytics';
import Group from './elems/Group';
import SwitchBonuses from './elems/SwitchBonuses';
import styles from './OrderForm.module.css';

export interface OrderFormProps {
  className?: string;
}

const OrderForm: FC<OrderFormProps> = (props) => {
  const { className, ...restProps } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(() => {
    setLoading(true);
  }, []);

  return (
    <Form
      {...restProps}
      className={cn(styles.form, className)}
      action='/order/check'
      validationSchemaUrl='/json-schema/order-form.json'
      onSubmit={handleSubmit}
    >
      <div className={styles.group}>
        <SwitchBonuses />
      </div>

      <Group className={styles.group} title='Выберите способ доставки'>
        Content
      </Group>

      <Group className={styles.group} title='Выберите способ оплаты'>
        Content
      </Group>

      <div className={styles.group}>Content</div>
    </Form>
  );
};

export default memo(OrderForm);
