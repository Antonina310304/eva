import { useCallback, useState, memo, FC } from 'react';
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
import styles from './DesignerServicesModal.module.css';

const DesignerServicesModal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [, { closeModal, openModal }] = useModals();
  const meta = useMeta({ ssr: true });
  const { videoConsultationMessengers } = meta.data;
  const selectItems = videoConsultationMessengers.map((item) => {
    return { ...item, name: item.title };
  });

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [modal.id, closeModal]);

  const handleSubmit = useCallback(() => {
    setLoading(true);
  }, []);

  const handleResponse = useCallback(() => {
    setLoading(false);

    openModal('Info', {
      view: 'success',
      title: 'Ваша заявка принята!',
      message: 'Специалист магазина свяжется с вами в течение 30 минут.',
    });
  }, [openModal]);

  const handleError = useCallback(() => {
    setLoading(false);

    openModal('Info', {
      view: 'error',
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });
  }, [openModal]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, className)}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <IconClose onClick={handleClose} className={styles.close} />
        <div className={styles.wrapper}>
          <div className={styles.image} />
          <div className={styles.content}>
            <div className={styles.title}>Услуга дизайнера</div>
            <div className={styles.p}>Персональное решение для вашего интерьера!</div>
            <div className={styles.p}>
              Мы поможем с обустройством квартиры или дома: подготовим макеты по вашим размерам,
              подберем подходящие по стилю, размеру, цвету и форме модели мягкой и корпусной мебели.
              Расставим акценты и добавим деталей!*
            </div>
            <div className={cn(styles.p, { [styles.secondary]: true })}>
              *Услуга предоставляется бесплатно при оформлении заказа на товары сайта, используемые
              в макете. Оставьте номер телефона, и мы свяжемся с вами в рабочее время сервиса (с
              10:00 до 21:00 по МСК).
            </div>

            <Form
              className={styles.form}
              action='/site/send-designer-service'
              validationSchemaUrl='/json-schema/designer-service-form.json'
              onSubmit={handleSubmit}
              onResponse={handleResponse}
              onError={handleError}
            >
              <FormItem>
                <div className={cn(styles.formRow, { [styles.columns]: true })}>
                  <div className={styles.formColumn}>
                    <Input name='DesignerServiceForm[firstname]' placeholder='ФИО' />
                  </div>

                  <div className={styles.formColumn}>
                    <InputPhone name='DesignerServiceForm[phone]' placeholder='Телефон' />
                  </div>
                </div>
              </FormItem>

              <FormItem>
                <div className={styles.formRow}>
                  <MainSelect
                    title='Способ связи'
                    name='DesignerServiceForm[messenger]'
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

export default memo(DesignerServicesModal);
