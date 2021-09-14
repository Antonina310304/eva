import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Input from '@UI/Input';
import FormItem from '@UI/FormItem';
import Form from '@UI/Form';
import Link from '@UI/Link';
import analytics from '@Utils/analytics';
import useModals from '@Hooks/useModals';
import InputPhone from '@Components/InputPhone';
import styles from './CallbackForm.module.css';

export interface CallbackFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CallbackForm: FC<CallbackFormProps> = (props) => {
  const { className, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [, { openModal }] = useModals();

  function isWorkTime() {
    const time = new Date();
    const timezone = +3;
    const hour = time.getUTCHours() + timezone;

    return hour >= 9 && hour < 22;
  }

  function hasCalltouch() {
    return typeof window.ctCheckCallbackShouldBeProcessed === 'function';
  }

  function normalizePhone(_phone) {
    const purePhone = _phone.toString().replace(/\D/g, '');

    return purePhone.charAt(0) === '7' ? `+${purePhone}` : `+7${purePhone}`;
  }

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
    (response, data) => {
      setLoading(false);
      if (response.status === 'ok') {
        const inputName = data['CallbackForm[name]'];
        const inputPhone = normalizePhone(data['CallbackForm[phone]']);

        if (isWorkTime() && hasCalltouch && window.ctSendCallbackRequest) {
          window.ctSendCallbackRequest(inputPhone);

          const timer = setInterval(() => {
            const requestStatus = window.ctGetCallbackRequestStatus();

            if (requestStatus !== 'Попытка отправки заявки на обратный звонок.') {
              clearInterval(timer);
            }
          }, 500);
        } else {
          (window.dataLayer = window.dataLayer || []).push({
            eCategory: 'callBackForm',
            eAction: 'send',
            eLabel: '',
            eNI: false,
            event: 'GAEvent',
          });
        }

        analytics.formCallMeSend({
          name: inputName,
          phone: inputPhone,
        });

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
      className={cn(styles.form, className)}
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
