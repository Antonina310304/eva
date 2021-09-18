import { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Input from '@UI/Input';
import Textarea from '@UI/Textarea';
import FormItem from '@UI/FormItem';
import Form from '@UI/Form';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import styles from './SendMessageForm.module.css';

export interface SendMessageFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SendMessageForm: FC<SendMessageFormProps> = (props) => {
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

        (window.dataLayer = window.dataLayer || []).push({
          eCategory: 'askQuestionForm',
          eAction: 'send',
          eLabel: '',
          eNI: false,
          event: 'GAEvent',
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
      className={cn(styles.form, className)}
      action='/site/send-message'
      validationSchemaUrl='/json-schema/contact-form.json'
      serverErrors={serverErrors}
      onSubmit={handleSubmit}
      onResponse={handleResponse}
      onError={handleError}
    >
      <FormItem>
        <Input type='text' placeholder='Имя' name='ContactForm[name]' />
      </FormItem>

      <FormItem>
        <Input type='text' placeholder='E-mail' name='ContactForm[email]' />
      </FormItem>

      <FormItem>
        <Textarea
          className={styles.textarea}
          placeholder='Ваше сообщение'
          name='ContactForm[body]'
        />
      </FormItem>

      <FormItem>
        <div className={styles.actions}>
          <Button className={styles.action} wide type='submit' waiting={loading}>
            Отправить сообщение
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

export default memo(SendMessageForm);
