import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import Button from '@UI/Button';
import Link from '@UI/Link';
import Scroller from '@UI/Scroller';
import InputsRange from '@UI/InputsRange';
import CheckboxList from '@UI/CheckboxList';
import { Modal as IModal } from '@Contexts/Modals';
import useModals from '@Hooks/useModals';
import Group from './elements/Group';
import GroupItem from './elements/GroupItem';
import styles from './FiltersModal.module.css';

export interface FiltersModalProps {
  className?: string;
  modal: IModal;
}

const types = [
  {
    defaultChecked: true,
    text: 'Натуральная кожа',
  },
  {
    text: 'Ткань',
  },
  {
    text: 'Экокожа',
  },
];

const FiltersModal: FC<FiltersModalProps> = (props) => {
  const { className, modal } = props;
  const [, { closeModal }] = useModals();

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  return (
    <Modal
      className={cn(styles.FiltersModal, [className])}
      id={modal.id}
      visible={modal.visible}
      view='slide-right'
    >
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.title}>Фильтр</div>
          <div className={styles.iconClose} onClick={handleClose} />
        </div>

        <Scroller className={styles.content}>
          <Group className={styles.group} title='Цена'>
            <InputsRange min={1000} max={30000} valueMin={1500} valueMax={25000} />
          </Group>

          <Group className={styles.group} title='Размеры'>
            <GroupItem title='Длина, см'>
              <InputsRange min={100} max={300} valueMin={120} valueMax={280} />
            </GroupItem>
            <GroupItem title='Ширина, см'>
              <InputsRange min={100} max={300} valueMin={120} valueMax={280} />
            </GroupItem>
            <GroupItem title='Высота, см'>
              <InputsRange min={100} max={300} valueMin={120} valueMax={280} />
            </GroupItem>
          </Group>

          <Group className={styles.group} title='Тип обивки'>
            <CheckboxList items={types} />
          </Group>
        </Scroller>

        <div className={styles.footer}>
          <Button className={styles.apply} wide title='Применить' />
          <div className={styles.footerAdditional}>
            <div className={styles.count}>Найдено 154 модели</div>
            <Link className={styles.reset}>Сбросить фильтр</Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(FiltersModal);
