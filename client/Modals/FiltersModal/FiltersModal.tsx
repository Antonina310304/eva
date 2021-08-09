import React, { memo, FC } from 'react';
import cn from 'classnames';

import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import Button from '@UI/Button';
import Link from '@UI/Link';
import InputsRange from '@UI/InputsRange';
import CheckboxList from '@UI/CheckboxList';

import Group from './elements/Group';
import GroupItem from './elements/GroupItem';

import styles from './FiltersModal.module.css';

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

const FiltersModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;

  return (
    <ModalSidebar
      {...restProps}
      className={cn(styles.FiltersModal, [className])}
      modal={modal}
      title='Фильтр'
    >
      <div className={styles.content}>
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
      </div>

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
    </ModalSidebar>
  );
};

export default memo(FiltersModal);
