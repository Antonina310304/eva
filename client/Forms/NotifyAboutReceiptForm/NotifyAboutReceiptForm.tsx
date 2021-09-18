import { useCallback, useState, memo, FC } from 'react';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import Button from '@UI/Button';
import Input from '@UI/Input';
import Form from '@UI/Form';
import FormItem from '@UI/FormItem';
import { ProductData } from '@Types/Product';
import styles from './NotifyAboutReceiptForm.module.css';

export interface NotifyAboutReceiptFormProps {
  className?: string;
  product: ProductData;
}

const NotifyAboutReceiptForm: FC<NotifyAboutReceiptFormProps> = (props) => {
  const { className, product, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [, { openModal }] = useModals();

  const handleBeforeSubmit = useCallback(
    (e) => {
      e.preventDefault();

      openModal('Info', {
        title: 'Упс!',
        text: 'Ещё не готово, заходите позже…',
      });
    },
    [openModal],
  );

  return (
    <Form
      {...restProps}
      className={cn(styles.form, className)}
      action='/'
      onBeforeSubmit={handleBeforeSubmit}
    >
      <FormItem>
        <Input type='text' placeholder='E-mail' name='email' />
      </FormItem>

      <Button className={styles.button} type='submit' waiting={loading}>
        Подписаться
      </Button>
    </Form>
  );
};

export default memo(NotifyAboutReceiptForm);
