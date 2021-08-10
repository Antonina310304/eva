import React, { useCallback, useState, memo, FC } from 'react';
import cn from 'classnames';

import ModalMain from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import Button from '@UI/Button';
import Input from '@UI/Input';
import Form from '@UI/Form';
import FormItem from '@UI/FormItem';
import Link from '@UI/Link';

import styles from './PriceDropModal.module.css';

export interface PriceDropModalProps {
  className?: string;
}

const PriceDropModal: FC<PriceDropModalProps> = (props) => {
  const { className, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [, { closeModal, openModal }] = useModals();
  const id = 'PriceDrop';

  const handleClose = useCallback(() => {
    closeModal('PriceDrop');
  }, [closeModal]);

  const handleSubmit = useCallback(() => {
    setLoading(true);
  }, []);

  const handleError = useCallback(() => {
    openModal('Info', {
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });
  }, [openModal]);

  return (
    <ModalMain {...restProps} className={cn(styles.modal, className)} onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <h3 className={styles.heading}>Снижение цены</h3>
          <IconClose className={styles.iconClose} onClick={handleClose} />
        </div>
        <div className={styles.description}>
          Как только цена на товар снизится, мы сразу сообщим вам об этом по почте.
        </div>
        <Form
          className={styles.form}
          action=''
          validationSchemaUrl=''
          onSubmit={handleSubmit}
          onError={handleError}
        >
          <FormItem>
            <Input type='text' placeholder='E-mail' name='[email]' />
          </FormItem>
          <Button className={styles.button} type='button'>
            Подписаться
          </Button>
        </Form>
        <div className={styles.info}>
          *Подписываясь, вы соглашаетесь с
          <Link
            className={styles.link}
            to='/static-page/privacy-policy'
            target='_blank'
            view='native'
          >
            {' политикой конфиденциальности '}
          </Link>
          и получением рекламно-информационных рассылок
        </div>
      </div>
    </ModalMain>
  );
};

export default memo(PriceDropModal);
