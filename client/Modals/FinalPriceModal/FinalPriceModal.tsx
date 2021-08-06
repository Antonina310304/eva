import React, { FC, memo, useCallback, useState, useEffect, useMemo } from 'react';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';

import styles from './FinalPriceModal.module.css';

const FinalPriceModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeModal }] = useModals();

  return <ModalSidebar modal={modal} view='default' />;
};

export default memo(FinalPriceModal);
