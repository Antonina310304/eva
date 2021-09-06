import React, { FC, HTMLAttributes, memo, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Input from '@UI/Input';
import InputPhone from '@Components/InputPhone';
import Textarea from '@UI/Textarea';
import FormItem from '@UI/FormItem';
import Link from '@UI/Link';
import Form from '@UI/Form';
import useModals from '@Hooks/useModals';
import styles from './ContactsAccountingForm.module.css';

export interface ContactsAccountingFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  mailTo: string;
}

const ContactsAccountingForm: FC<ContactsAccountingFormProps> = (props) => {
  const { className, mailTo, ...restProps } = props;
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
          message: 'Ваше сообщение отправлено.',
        });
        (window.dataLayer = window.dataLayer || []).push({
          eCategory: 'proposalForCooperationForm',
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

  useEffect(() => {
    (window.dataLayer = window.dataLayer || []).push({
      eCategory: 'proposalForCooperationForm',
      eAction: 'open',
      eLabel: '',
      eNI: false,
      event: 'GAEvent',
    });
  }, []);

  return (
    <Form
      {...restProps}
      className={cn(styles.contactsAccountingForm, className)}
      action='/site/message-for-accounting-department'
      validationSchemaUrl='/json-schema/contacts-accounting-form.json'
      serverErrors={serverErrors}
      onSubmit={handleSubmit}
      onResponse={handleResponse}
      onError={handleError}
    >
      <FormItem>
        <Input type='text' placeholder='ИНН организации/ИП' name='ContactsAccountingForm[name]' />
      </FormItem>

      <FormItem>
        <InputPhone type='text' placeholder='Телефон' name='ContactsAccountingForm[phone]' />
      </FormItem>

      <FormItem>
        <Input type='text' placeholder='Электронная почта' name='ContactsAccountingForm[email]' />
      </FormItem>

      <FormItem>
        <Textarea
          className={styles.textarea}
          placeholder='Обращение'
          name='ContactsAccountingForm[text]'
        />
      </FormItem>

      <input type='hidden' name='ContactsAccountingForm[mailTo]' value={mailTo} />

      <FormItem>
        <div className={styles.ctions}>
          <Button className={styles.ction} wide type='submit' waiting={loading}>
            Отправить
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

export default memo(ContactsAccountingForm);
