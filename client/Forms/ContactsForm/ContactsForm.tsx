import React, { FC, HTMLAttributes, memo, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Input from '@UI/Input';
import Textarea from '@UI/Textarea';
import FormItem from '@UI/FormItem';
import Form from '@UI/Form';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import styles from './ContactsForm.module.css';

export interface ContactsFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  director?: boolean;
  mailTo: string;
}

const ContactsForm: FC<ContactsFormProps> = (props) => {
  const { className, mailTo, director, ...restProps } = props;
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
          test: 'Ваше сообщение отправлено.',
        });

        (window.dataLayer = window.dataLayer || []).push({
          eCategory: director ? 'writeToDirectorForm' : 'proposalForCooperationForm',
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
    [handleError, openModal, director],
  );

  useEffect(() => {
    (window.dataLayer = window.dataLayer || []).push({
      eCategory: director ? 'writeToDirectorForm' : 'proposalForCooperationForm',
      eAction: 'open',
      eLabel: '',
      eNI: false,
      event: 'GAEvent',
    });
  }, [director]);

  return (
    <Form
      {...restProps}
      className={cn(styles.contactsForm, className)}
      action='/site/message-for-department'
      validationSchemaUrl='/json-schema/contacts-form.json'
      serverErrors={serverErrors}
      onSubmit={handleSubmit}
      onResponse={handleResponse}
      onError={handleError}
    >
      <FormItem>
        <Input type='text' placeholder='Имя' name='ContactsForm[name]' />
      </FormItem>

      <FormItem>
        <Input type='text' placeholder='E-mail' name='ContactsForm[email]' />
      </FormItem>

      <FormItem>
        <Textarea
          className={styles.textarea}
          placeholder='Ваше сообщение'
          name='ContactsForm[text]'
        />
      </FormItem>

      <input type='hidden' name='ContactsForm[mailTo]' value={mailTo} />

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

export default memo(ContactsForm);
