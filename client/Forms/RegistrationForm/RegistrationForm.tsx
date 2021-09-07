import React, {
  HTMLAttributes,
  FC,
  MouseEvent,
  memo,
  useCallback,
  useState,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import cn from 'classnames';

import { ApiCabinet } from '@Api/Cabinet';
import InputCode from '@Components/InputCode';
import ResendCodeTimer from '@Components/ResendCodeTimer';
import InputPhone from '@Components/InputPhone';
import FormItem from '@UI/FormItem';
import Input from '@UI/Input';
import Link from '@UI/Link';
import Button from '@UI/Button';
import Checkbox from '@UI/Checkbox';
import IconClose from '@UI/IconClose';
import Form from '@UI/Form';
// import usePage from '@Hooks/usePage';
import useModals from '@Hooks/useModals';
import analytics from '@Utils/analytics';
import { Profile } from '@Types/Profile';
import { ModalId } from '@Contexts/Modals';
import styles from './RegistrationForm.module.css';

export interface RegistrationFormProps extends HTMLAttributes<HTMLFormElement> {
  className?: string;
  defaultName: string;
  defaultPhone: string;
  defaultEmail: string;
  onToAuth?: (e: MouseEvent) => void;
  onSuccess?: (profile: Profile) => void;
}

export interface ErrorMessageObject {
  type: 'link';
  props: any;
  action?: {
    name: 'link';
    props: any;
  };
}

export type ErrorMessage = string | ErrorMessageObject;

export type Step = 'register' | 'check-confirmation-code';

const RegistrationForm: FC<RegistrationFormProps> = (props) => {
  const {
    className,
    defaultName,
    defaultPhone,
    defaultEmail,
    onSuccess,
    onToAuth,
    ...restProps
  } = props;
  const [, { openModal }] = useModals();
  const [step, setStep] = useState<Step>('register');
  const [serverErrors, setServerErrors] = useState<any[]>([]);
  const [keyRepeat, setKeyRepeat] = useState(1);
  const [waitingRepeat, setWaitingRepeat] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [waitingPromoCode, setWaitingPromoCode] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const refData = useRef(null);
  const [wantToGetPromoCode, setWantToGetPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState<string>(null);
  const [promoCodeApplied, setPromoCodeApplied] = useState(null);
  const refSubmitButton = useRef<HTMLButtonElement>();
  const refResendCode = useRef(false);
  const disabledFirstStep = waiting || disabled || step === 'check-confirmation-code';

  const pointOfContact = useMemo(() => {
    // if (page === 'Order') return 'CartOrOrder';
    // if (page === 'DivanClub') return 'Landing';

    return 'Other';
  }, []);

  const triggerSubmit = useCallback(() => {
    refSubmitButton.current?.click();
  }, []);

  const transformDataBeforeSubmit = useCallback((data: any) => {
    return {
      ...data,
      resendCode: refResendCode.current.toString(),
    };
  }, []);

  const handleError = useCallback((err) => {
    console.log('error', err);
  }, []);

  const handleSubmit = useCallback(() => {
    setWaiting(true);

    analytics.pushDataLayer({
      eCategory: 'lk_registration',
      eAction: 'send',
      eLabel: '',
      eNI: false,
      event: 'GAEvent',
    });
  }, []);

  const handleClickLink = useCallback(
    (e, message: ErrorMessageObject) => {
      e.preventDefault();

      if (!message.action) return;

      openModal(message.action.name as ModalId, {
        ...message.action.props,
        defaultPhone: refData.current.phone,
      });
    },
    [openModal],
  );

  const renderErrorMessage = useCallback(
    (message: ErrorMessage[]) => {
      if (typeof message === 'string') return message;

      return (
        <>
          {message.map((item, index) => {
            if (typeof item === 'string') return item;

            switch (item.type) {
              case 'link':
                return (
                  <Link
                    {...item.props}
                    key={index}
                    view='native'
                    onClick={(e) => handleClickLink(e, item)}
                  />
                );

              default:
                return null;
            }
          })}
        </>
      );
    },
    [handleClickLink],
  );

  const handleResponse = useCallback(
    (res, data) => {
      refData.current = data;
      setWaiting(false);
      setWaitingRepeat(false);

      if (!res.ok) {
        setServerErrors(() => {
          const newErrors = res.errors.map((error: any) => ({
            name: error.field,
            message: renderErrorMessage(error.message),
          }));

          return newErrors;
        });
        return;
      }

      if (refResendCode.current) {
        setKeyRepeat((prev) => prev + 1);
        setWaitingRepeat(false);
        refResendCode.current = false;
        return;
      }

      if (step === 'register') {
        setStep('check-confirmation-code');
      }

      if (step === 'check-confirmation-code') {
        setDisabled(true);

        if (onSuccess) onSuccess(res.data);
      }
    },
    [onSuccess, renderErrorMessage, step],
  );

  const handleRepeatSendCode = useCallback(async () => {
    setWaitingRepeat(true);
    refResendCode.current = true;

    triggerSubmit();
  }, [triggerSubmit]);

  const handleComplete = useCallback(() => {
    triggerSubmit();
  }, [triggerSubmit]);

  const handleChangePhone = useCallback(() => {
    setStep('register');
  }, []);

  const handleChangeWantToGetPromoCode = useCallback(() => {
    setWantToGetPromoCode((prev) => !prev);
  }, []);

  const handleChangePromoCode = useCallback((e) => {
    setPromoCode(e.target.value);
  }, []);

  const handleApplyPromoCode = useCallback(async () => {
    try {
      setWaitingPromoCode(true);

      await ApiCabinet.checkPromoCode({ promoCode });

      setPromoCodeApplied(promoCode);
    } catch (err) {
      setServerErrors((prev) => [...prev, { name: 'promoCode', message: 'Промокод не действует' }]);
    } finally {
      setWaitingPromoCode(false);
    }
  }, [promoCode]);

  const handleCancelPromoCode = useCallback(() => {
    setServerErrors([]);
    setPromoCodeApplied(null);
  }, []);

  // Аналитика во время открытия формы
  useEffect(() => {
    analytics.pushDataLayer({
      eCategory: 'lk_registration',
      eAction: 'open',
      eLabel: '',
      eNI: false,
      event: 'GAEvent',
    });
  }, []);

  return (
    <Form
      {...restProps}
      className={cn(styles.form, className)}
      action='/cabinet/formes/register'
      validationSchemaUrl='/cabinet/formes/register/schema'
      transformDataBeforeSubmit={transformDataBeforeSubmit}
      serverErrors={serverErrors}
      onSubmit={handleSubmit}
      onResponse={handleResponse}
      onError={handleError}
    >
      <input readOnly hidden name='pointOfContact' value={pointOfContact} />
      <input readOnly hidden name='promoCodeApplied' value={promoCodeApplied} />

      <FormItem className={styles.description}>
        Заполните все поля, чтобы получать бонусы и подарки по программе лояльности
      </FormItem>

      <FormItem label='ФИО*'>
        <Input readOnly={disabledFirstStep} name='fullName' defaultValue={defaultName} />
      </FormItem>

      <FormItem
        label='Телефон*'
        bottom={
          step === 'check-confirmation-code' && (
            <div className={styles.phoneBottom}>
              <Link
                className={styles.phoneChanger}
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
        <InputPhone readOnly={disabledFirstStep} name='phone' defaultValue={defaultPhone} />
      </FormItem>

      <FormItem label='E-mail*'>
        <Input readOnly={disabledFirstStep} name='email' defaultValue={defaultEmail} />
      </FormItem>

      <FormItem
        className={cn(styles.item, {
          [styles.disabled]: disabledFirstStep,
        })}
      >
        <Checkbox
          name='wantToGetPromoCode'
          text='У меня есть промокод на бонусы'
          checked={wantToGetPromoCode}
          onChange={handleChangeWantToGetPromoCode}
        />

        {wantToGetPromoCode && (
          <>
            {promoCodeApplied ? (
              <div className={styles.appliedPromocode}>
                <span>Промокод добавлен</span>
                <IconClose
                  className={styles.appliedPromocodeRemove}
                  onClick={handleCancelPromoCode}
                />
              </div>
            ) : (
              <div className={styles.wrapperPromoCode}>
                <Input
                  name='promoCode'
                  disabled={waitingPromoCode}
                  value={promoCode}
                  onChange={handleChangePromoCode}
                />
                <Button
                  theme='secondary'
                  type='button'
                  wide
                  waiting={waitingPromoCode}
                  onClick={handleApplyPromoCode}
                >
                  Применить
                </Button>
              </div>
            )}
          </>
        )}
      </FormItem>

      {step === 'check-confirmation-code' && (
        <FormItem
          className={styles.rowCode}
          key={keyRepeat}
          label='Код из SMS'
          bottom={
            <ResendCodeTimer
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
            onComplete={handleComplete}
          />
        </FormItem>
      )}

      <FormItem className={cn(styles.buttons, { [styles.visible]: step === 'register' })}>
        <Button
          wide
          theme='primary'
          type='submit'
          waiting={step === 'register' && waiting}
          ref={refSubmitButton}
        >
          Получить код в SMS
        </Button>
      </FormItem>

      {step === 'register' && (
        <>
          <div className={styles.wrapperAuthLink}>
            <Link
              preventDefault
              className={styles.authLink}
              to='/cabinet/authorization'
              view='secondary'
              onClick={onToAuth}
            >
              Войти в личный кабинет
            </Link>
          </div>

          <div className={styles.info}>
            {'* Отправляя заявку, я соглашаюсь с условиями '}
            <Link to='/static-page/privacy-policy' view='native' target='_blank'>
              Политики конфиденциальности
            </Link>
            {` и получением рекламно-информационных рассылок.`}
          </div>
        </>
      )}
    </Form>
  );
};

export default memo(RegistrationForm);
