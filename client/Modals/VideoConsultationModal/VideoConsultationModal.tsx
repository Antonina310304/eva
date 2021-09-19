import { useCallback, useState, useEffect, memo, FC } from 'react';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import useMeta from '@Queries/useMeta';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import InputPhone from '@Components/InputPhone';
import IconClose from '@UI/IconClose';
import Form from '@UI/Form';
import Input from '@UI/Input';
import Link from '@UI/Link';
import Button from '@UI/Button';
import FormItem from '@UI/FormItem';
import MainSelect from '@UI/MainSelect';
import styles from './VideoConsultationModal.module.css';

const VideoConsultationModal: FC<ModalMainProps> = (props) => {
  const { className, modal, onClose, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [, { openModal }] = useModals();
  const meta = useMeta();

  const handleSubmit = useCallback(() => {
    setLoading(true);

    (window.dataLayer = window.dataLayer || []).push({
      eCategory: 'videoConsultationForm',
      eAction: 'send',
      eLabel: '',
      eNI: false,
      event: 'GAEvent',
    });
  }, []);

  const handleResponse = useCallback(() => {
    setLoading(false);

    openModal('Info', {
      view: 'success',
      title: 'Ваша заявка принята!',
      message: 'Специалист магазина свяжется с вами в течение 30 минут.',
    });

    (window.dataLayer = window.dataLayer || []).push({ event: 'typ_videocons' });
  }, [openModal]);

  const handleError = useCallback(() => {
    setLoading(false);

    openModal('Info', {
      view: 'error',
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });
  }, [openModal]);

  useEffect(() => {
    (window.dataLayer = window.dataLayer || []).push({
      eCategory: 'videoConsultationForm',
      eAction: 'open',
      eLabel: '',
      eNI: false,
      event: 'GAEvent',
    });
  }, []);

  if (!meta.isSuccess) return null;

  const { videoConsultationMessengers } = meta.data;
  const selectItems = videoConsultationMessengers.map((item) => ({ ...item, name: item.title }));

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, className)}
      modal={modal}
      onClose={onClose}
    >
      <div className={styles.container}>
        <IconClose onClick={onClose} theme='inverse' className={styles.close} />
        <div className={styles.wrapper}>
          <div className={styles.image} />
          <div className={styles.content}>
            <div className={styles.title}>Видеоконсультация со специалистом</div>
            <div className={styles.p}>
              Персональные видеоконсультации со специалистом магазина позволят выбрать мебель, не
              выходя из дома.
            </div>
            <div className={styles.p}>
              Мы поможем с подбором, подробно расскажем об интересующих вас моделях, покажем изделие
              и образцы материалов вживую, наглядно продемонстрируем работу мебельных механизмов и
              качество сборки.
            </div>
            <div className={cn(styles.p, { [styles.secondary]: true })}>
              Оставьте свой номер телефона, и мы свяжемся с вами в течение 30 минут в рабочее время
              сервиса (с 10:00 до 21:00 по МСК) наиболее удобным способом.
            </div>

            <Form
              className={styles.form}
              action='/site/send-video-consultation'
              validationSchemaUrl='/json-schema/video-consultation-form.json'
              onSubmit={handleSubmit}
              onResponse={handleResponse}
              onError={handleError}
            >
              <FormItem>
                <div className={cn(styles.formRow, { [styles.columns]: true })}>
                  <div className={styles.formColumn}>
                    <Input name='VideoConsultationForm[firstname]' placeholder='ФИО' />
                  </div>

                  <div className={styles.formColumn}>
                    <InputPhone name='VideoConsultationForm[phone]' placeholder='Телефон' />
                  </div>
                </div>
              </FormItem>

              <FormItem>
                <div className={styles.formRow}>
                  <MainSelect
                    title='Способ связи'
                    name='VideoConsultationForm[messenger]'
                    className={styles.select}
                    items={selectItems}
                    wide
                  />
                </div>
              </FormItem>

              <div className={styles.submit}>
                <Button wide type='submit' waiting={loading} theme='primary'>
                  Отправить заявку
                </Button>
              </div>
              <div className={styles.info}>
                {'* Отправляя заявку, я соглашаюсь с условиями '}
                <Link
                  className={styles.policy}
                  to='/static-page/privacy-policy'
                  target='_blank'
                  view='native'
                >
                  Политики конфиденциальности
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </ModalMain>
  );
};

export default memo(VideoConsultationModal);
