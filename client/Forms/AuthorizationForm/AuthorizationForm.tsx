import React, {
  FC,
  FormHTMLAttributes,
  MouseEvent,
  memo,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import cn from 'classnames';

import InputPhone from '@Components/InputPhone';
import InputCode from '@Components/InputCode';
import ResendCodeTimer from '@Components/ResendCodeTimer';
import FormItem from '@UI/FormItem';
import Button from '@UI/Button';
import Link from '@UI/Link';
import Form from '@UI/Form';
import analytics from '@Utils/analytics';
import { Profile } from '@Types/Profile';
import styles from './AuthorizationForm.module.css';

export interface AuthorizationFormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  wide?: boolean;
  defaultPhone?: string;
  onToRegister?: (e: MouseEvent) => void;
  onSuccess?: (profile: Profile) => void;
}

export type Step = 'get-auth-code' | 'login';

const AuthorizationForm: FC<AuthorizationFormProps> = (props) => {
  const { className, wide, defaultPhone, onToRegister, onSuccess, ...restProps } = props;
  const [step, setStep] = useState<Step>('get-auth-code');
  const [waiting, setWaiting] = useState(false);
  const [waitingRepeat, setWaitingRepeat] = useState(false);
  const [keyRepeat, setKeyRepeat] = useState(1);
  const [serverErrors, setServerErrors] = useState<any[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [resendCode, setResendCode] = useState(false);
  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const triggerSubmit = useCallback(() => {
    if (!refSubmitButton.current) return;

    refSubmitButton.current.click();
  }, []);

  const transformDataBeforeSubmit = useCallback(
    (data: any) => {
      return {
        ...data,
        resendCode,
      };
    },
    [resendCode],
  );

  const handleComplete = useCallback(() => {
    if (!refSubmitButton.current) return;

    refSubmitButton.current.click();
  }, []);

  const handleSubmit = useCallback(() => {
    setWaiting(true);

    if (step === 'login') {
      analytics.pushDataLayer({
        eCategory: 'lk_login',
        eAction: 'send',
        eLabel: '',
        eNI: false,
        event: 'GAEvent',
      });
    }
  }, [step]);

  const handleResponse = useCallback(
    (res) => {
      setWaiting(false);

      if (!res.ok) {
        setServerErrors(() => {
          return res.errors.map((error: any) => ({
            ...error,
            name: error.field,
          }));
        });
        return;
      }

      if (resendCode) {
        setKeyRepeat((prev) => prev + 1);
        setResendCode(false);
        setWaitingRepeat(false);
        return;
      }

      if (step === 'get-auth-code') {
        setStep('login');

        analytics.pushDataLayer({
          eCategory: 'lk_registration',
          eAction: 'checkout',
          eLabel: '',
          eNI: false,
          event: 'GAEvent',
        });
        return;
      }

      if (step === 'login') {
        setDisabled(true);
        if (onSuccess) onSuccess(res.data);
      }
    },
    [onSuccess, resendCode, step],
  );

  const handleError = useCallback((err) => {
    console.log('ERROR', err);
    setWaiting(false);
  }, []);

  const handleRepeatSendCode = useCallback(async () => {
    setWaitingRepeat(true);
    setResendCode(true);

    setTimeout(triggerSubmit);
  }, [triggerSubmit]);

  const handleChangePhone = useCallback((e) => {
    e.preventDefault();
    setStep('get-auth-code');
  }, []);

  const handleToRegister = useCallback(
    (e) => {
      e.preventDefault();
      if (onToRegister) onToRegister(e);
    },
    [onToRegister],
  );

  // Сразу отправляем запрос, если был указан номер
  useEffect(() => {
    if (!defaultPhone) return;

    setTimeout(triggerSubmit, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Аналитика во время открытия формы
  useEffect(() => {
    analytics.pushDataLayer({
      eCategory: 'lk_login',
      eAction: 'open',
      eLabel: '',
      eNI: false,
      event: 'GAEvent',
    });
  }, []);

  return (
    <Form
      {...restProps}
      method='POST'
      className={cn(styles.form, { [styles.wide]: wide }, className)}
      action='/cabinet/formes/login'
      validationSchemaUrl='/cabinet/formes/login/schema'
      serverErrors={serverErrors}
      transformDataBeforeSubmit={transformDataBeforeSubmit}
      onSubmit={handleSubmit}
      onResponse={handleResponse}
      onError={handleError}
    >
      <FormItem
        label='Телефон'
        bottom={
          step !== 'get-auth-code' && (
            <div className={styles.phoneBottom}>
              <Link
                className={styles.linkChangePhone}
                view='native'
                to='#'
                onClick={handleChangePhone}
              >
                Изменить телефон
              </Link>
            </div>
          )
        }
      >
        <InputPhone
          name='phone'
          defaultValue={defaultPhone}
          readOnly={waiting || disabled || step !== 'get-auth-code'}
        />
      </FormItem>

      {step !== 'get-auth-code' && (
        <FormItem
          className={styles.rowCode}
          label='Код из SMS'
          bottom={
            <ResendCodeTimer
              key={keyRepeat}
              waiting={waiting || waitingRepeat}
              seconds={60}
              onRepeat={handleRepeatSendCode}
            />
          }
        >
          <InputCode
            autoFocus
            readOnly={waiting || waitingRepeat || disabled}
            name='code'
            key={keyRepeat}
            onComplete={handleComplete}
          />
        </FormItem>
      )}

      <FormItem className={cn(styles.buttons, { [styles.visible]: step === 'get-auth-code' })}>
        <Button wide theme='primary' type='submit' waiting={waiting} ref={refSubmitButton}>
          Получить код в SMS
        </Button>
      </FormItem>

      <FormItem>
        {`Нет учетной записи? `}
        <Link
          className={styles.link}
          view='primary'
          to='/cabinet/registration'
          onClick={handleToRegister}
        >
          Зарегистрироваться
        </Link>
      </FormItem>
    </Form>
  );
};

export default memo(AuthorizationForm);
