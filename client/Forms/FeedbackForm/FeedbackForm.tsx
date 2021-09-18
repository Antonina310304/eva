import { FC, useState, useEffect, useCallback, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import Form from '@UI/Form';
import useModals from '@Hooks/useModals';
import FormItem from '@UI/FormItem';
import Input from '@UI/Input';
import Button from '@UI/Button';
import Textarea from '@UI/Textarea';
import styles from './FeedbackForm.module.css';

export interface FeedbackFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FeedbackForm: FC<FeedbackFormProps> = (props) => {
  const { className, ...restProps } = props;
  const [, { openModal }] = useModals();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
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

      if (response?.status !== 'success') {
        handleError();
        return;
      }

      openModal('Info', {
        view: 'success',
        title: 'Ваша заявка принята!',
        text: 'Наш менеджер свяжется с вами в ближайшее время.',
      });

      // Аналитика
      (window.dataLayer = window.dataLayer || []).push({
        eCategory: 'proposalForCooperationForm',
        eAction: 'send',
        eLabel: '',
        eNI: false,
        event: 'GAEvent',
      });
    },
    [handleError, openModal],
  );

  // Событие в аналитику при открытии формы
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
    <div {...restProps} className={cn(styles.feedback, className)}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Начать сотрудничество?</h2>
        <div className={styles.description}>
          Если вы хотите с нами сотрудничать, отправьте свой запрос на электронную почту
          <Link target='_blank' view='native' to='mailto:partner@divan.ru'>
            {' designer@divan.ru '}
          </Link>
          или воспользуйтесь формой обратной связи*
        </div>
        <Form
          className={cn(styles.form, className)}
          action='/b2b/send-letter'
          method='POST'
          validationSchemaUrl='/json-schema/feedback-form.json'
          onError={handleError}
          onSubmit={handleSubmit}
          onResponse={handleResponse}
        >
          <div className={styles.formWrapper}>
            <FormItem>
              <Input className={styles.input} type='text' placeholder='Имя' name='name' />
            </FormItem>
            <FormItem>
              <Input className={styles.input} type='text' placeholder='Email' name='mailFrom' />
            </FormItem>
            <FormItem>
              <Textarea className={styles.input} placeholder='Сообщение' name='message' />
            </FormItem>
            <Button type='submit' className={styles.button} waiting={loading}>
              Отправить заявку
            </Button>
          </div>
        </Form>
        <span className={styles.info}>* Предложение не является публичной офертой.</span>
      </div>
    </div>
  );
};

export default memo(FeedbackForm);
