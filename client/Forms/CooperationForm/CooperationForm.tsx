import React, { FC, HTMLAttributes, memo, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Input from '@UI/Input';
import Textarea from '@UI/Textarea';
import FormItem from '@UI/FormItem';
import Form from '@UI/Form';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import styles from './CooperationForm.module.css';

export interface CooperationFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  mailTo: string;
  page: string;
}

const CooperationForm: FC<CooperationFormProps> = (props) => {
  const { className, mailTo, page, ...restProps } = props;
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
      className={cn(styles.contactsForm, className)}
      action='/site/press-send-message'
      validationSchemaUrl='/json-schema/feedback-form.json'
      serverErrors={serverErrors}
      onSubmit={handleSubmit}
      onResponse={handleResponse}
      onError={handleError}
    >
      <input type='hidden' name='mailTo' value={mailTo} />
      <input type='hidden' name='pageCode' value={page} />
      <FormItem>
        <Input type='text' placeholder='Имя' name='PressFeedbackForm[name]' />
      </FormItem>

      <FormItem>
        <Input type='text' placeholder='Электронная почта' name='PressFeedbackForm[email]' />
      </FormItem>

      <FormItem>
        <Textarea
          className={styles.textarea}
          placeholder='Сообщение'
          name='PressFeedbackForm[text]'
        />
      </FormItem>

      <input type='hidden' name='PressFeedbackForm[mailTo]' value={mailTo} />

      <FormItem>
        <div className={styles.actions}>
          <Button className={styles.action} wide type='submit' waiting={loading}>
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

export default memo(CooperationForm);
