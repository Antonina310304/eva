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
import useMedias from '@Hooks/useMedias';
import Group from './elements/Group';
import GroupItem from './elements/GroupItem';
import styles from './FiltersModal.module.css';

export interface FiltersModalProps {
  className?: string;
  modal: IModal;
}

const colors = [
  {
    defaultChecked: true,
    text: 'Зеленый',
    color: '#717C53',
  },
  {
    text: 'Бежевый',
    color: '#DACEA1',
  },
  {
    text: 'Желтый',
    color: '#F1E67D',
  },
  {
    text: 'Синий',
    color: '#49637C',
  },
];
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
  const { isMobileS } = useMedias();

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

        <Scroller className={styles.content} space={isMobileS ? 0 : 40} invisible={isMobileS}>
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

          <Group className={styles.group} title='Цвет'>
            <CheckboxList items={colors} />
          </Group>

          <Group className={styles.group} title='Тип обивки' selectedText='Натуральная кожа'>
            <CheckboxList items={types} />
          </Group>
        </Scroller>

        <div className={styles.footer}>
          <Button className={styles.apply} wide>
            Применить
          </Button>
          <div className={styles.footerAdditional}>
            <div className={styles.count}>Найдено 154 модели</div>
            <Link className={styles.reset} to='#'>
              Сбросить фильтр
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(FiltersModal);