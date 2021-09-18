import { useCallback, memo, MouseEvent, useState, useEffect, FC } from 'react';

import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import AuthorizationForm from '@Forms/AuthorizationForm';
import RegistrationForm from '@Forms/RegistrationForm';
import useModals from '@Hooks/useModals';
import { Profile } from '@Types/Profile';
import styles from './AuthorizationModal.module.css';

export type Step = 'authorization' | 'registration';

const titles = {
  authorization: 'Вход и регистрация',
  registration: 'Регистрация',
};

const AuthorizationModal: FC<ModalSidebarProps> = (props) => {
  const { modal, ...restProps } = props;
  const data: any = modal.data || {};
  const [, { closeModal }] = useModals();
  const [step, setStep] = useState<Step>(data.step || 'authorization');

  const handleToRegister = useCallback((e: MouseEvent) => {
    e.preventDefault();

    setStep('registration');
  }, []);

  const handleToAuth = useCallback((e: MouseEvent) => {
    e.preventDefault();

    setStep('authorization');
  }, []);

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  const handleSuccess = useCallback(
    (profile: Profile) => {
      const fnSuccess = data.onSuccess || (() => {});

      Promise.resolve(fnSuccess(profile)).then(handleClose);
    },
    [data, handleClose],
  );

  useEffect(() => {
    setStep(data.step || 'authorization');
  }, [data]);

  return (
    <ModalSidebar {...restProps} title={titles[step]} view='default' modal={modal}>
      <div className={styles.formWrapper}>
        {step === 'authorization' && (
          <AuthorizationForm
            wide
            defaultPhone={data.defaultPhone}
            onToRegister={handleToRegister}
            onSuccess={handleSuccess}
          />
        )}
        {step === 'registration' && (
          <RegistrationForm
            defaultName={data.defaultName}
            defaultPhone={data.defaultPhone}
            defaultEmail={data.defaultEmail}
            onToAuth={handleToAuth}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </ModalSidebar>
  );
};

export default memo(AuthorizationModal);
