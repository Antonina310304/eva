import React, { FC, HTMLAttributes, memo, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Input from '@UI/Input';
import InputPhone from '@Components/InputPhone';
import Textarea from '@UI/Textarea';
import FormItem from '@UI/FormItem';
import Form from '@UI/Form';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import styles from './CallbackForm.module.css';

export interface CallbackFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CallbackForm: FC<CallbackFormProps> = (props) => {
  const { className, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [, { openModal }] = useModals();

  const handleSubmit = useCallback(() => {
    setLoading(true);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);

    openModal('Info', {
      view: 'error',
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });
  }, [openModal]);

  const handleResponse = useCallback(
    (response) => {
      setLoading(false);
      if (response.status === 'ok') {
        openModal('Info', {
          view: 'success',
          title: 'Спасибо!',
          text: 'Ваше сообщение отправлено.',
        });
      } else if (response.status === 'error') {
        if (response.code === 0) {
          setServerErrors(response.logs);
        } else {
          handleError();
        }
      } else {
        handleError();
      }
    },
    [handleError, openModal],
  );

  return (
    <Form
      {...restProps}
      className={cn(styles.callbackForm, className)}
      action='/site/send-callback'
      validationSchemaUrl='/json-schema/callback-form.json'
      serverErrors={serverErrors}
      onSubmit={handleSubmit}
      onResponse={handleResponse}
      onError={handleError}
    >
      <FormItem>
        <Input type='text' placeholder='Имя' name='CallbackForm[name]' />
      </FormItem>

      <FormItem>
        <InputPhone type='text' placeholder='Телефон' name='CallbackForm[phone]' />
      </FormItem>

      <FormItem>
        <div className={styles.actions}>
          <Button className={styles.action} wide type='submit' waiting={loading}>
            Свяжитесь со мной
          </Button>
        </div>
      </FormItem>

      <div className={styles.info}>
        *Отправляя заявку, я соглашаюсь с условиями
        <br />
        <Link to='/static-page/privacy-policy' view='native' target='_blank'>
          Политики конфиденциальности
        </Link>
      </div>
    </Form>
  );
};

export default memo(CallbackForm);
