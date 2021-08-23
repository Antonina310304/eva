import React, { FC, memo, HTMLAttributes } from 'react';

import SiteNav from '@Components/Header/elems/SiteNav/SiteNav';
import MainNav from '@Components/Header/elems/MainNav/MainNav';
import styles from './Header.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const siteNavList = [
  { title: 'Каталог', link: 'catalog' },
  { title: 'Идеи и тенды', link: 'ideas' },
  { title: 'О компании', link: 'about' },
  { title: 'Магазины', link: 'store' },
];

const mainNavList = [
  {
    title: 'Акции и скидки',
    link: 'catalog',
    dropDown: [
      { title: 'Диваны и кресла', link: 'ideas' },
      { title: 'Шкафы', link: 'about' },
      { title: 'Спальня', link: 'store' },
      { title: 'Гостиная', link: 'catalog' },
      { title: 'Прихожая', link: 'ideas' },
      { title: 'Кухня', link: 'about' },
      { title: 'Детская', link: 'store' },
      { title: 'Кабинет', link: 'store' },
    ],
  },
  {
    title: 'Диваны и кресла',
    link: 'ideas',
    dropDown: [
      { title: 'Диваны и кресла', link: 'ideas' },
      { title: 'Шкафы', link: 'about' },
      { title: 'Спальня', link: 'store' },
      { title: 'Гостиная', link: 'catalog' },
      { title: 'Прихожая', link: 'ideas' },
      { title: 'Кухня', link: 'about' },
      { title: 'Детская', link: 'store' },
      { title: 'Кабинет', link: 'store' },
    ],
  },
  {
    title: 'Шкафы',
    link: 'about',
    dropDown: [
      { title: 'Диваны и кресла', link: 'ideas' },
      { title: 'Шкафы', link: 'about' },
      { title: 'Спальня', link: 'store' },
      { title: 'Гостиная', link: 'catalog' },
      { title: 'Прихожая', link: 'ideas' },
      { title: 'Кухня', link: 'about' },
      { title: 'Детская', link: 'store' },
      { title: 'Кабинет', link: 'store' },
    ],
  },
  {
    title: 'Спальня',
    link: 'store',
    dropDown: [
      { title: 'Диваны и кресла', link: 'ideas' },
      { title: 'Шкафы', link: 'about' },
      { title: 'Спальня', link: 'store' },
      { title: 'Гостиная', link: 'catalog' },
      { title: 'Прихожая', link: 'ideas' },
      { title: 'Кухня', link: 'about' },
      { title: 'Детская', link: 'store' },
      { title: 'Кабинет', link: 'store' },
    ],
  },
  {
    title: 'Гостиная',
    link: 'catalog',
    dropDown: [
      { title: 'Диваны и кресла', link: 'ideas' },
      { title: 'Шкафы', link: 'about' },
      { title: 'Спальня', link: 'store' },
      { title: 'Гостиная', link: 'catalog' },
      { title: 'Прихожая', link: 'ideas' },
      { title: 'Кухня', link: 'about' },
      { title: 'Детская', link: 'store' },
      { title: 'Кабинет', link: 'store' },
    ],
  },
  {
    title: 'Прихожая',
    link: 'ideas',
    dropDown: [
      { title: 'Диваны и кресла', link: 'ideas' },
      { title: 'Шкафы', link: 'about' },
      { title: 'Спальня', link: 'store' },
      { title: 'Гостиная', link: 'catalog' },
      { title: 'Прихожая', link: 'ideas' },
      { title: 'Кухня', link: 'about' },
      { title: 'Детская', link: 'store' },
      { title: 'Кабинет', link: 'store' },
    ],
  },
  {
    title: 'Кухня',
    link: 'about',
    dropDown: [
      { title: 'Диваны и кресла', link: 'ideas' },
      { title: 'Шкафы', link: 'about' },
      { title: 'Спальня', link: 'store' },
      { title: 'Гостиная', link: 'catalog' },
      { title: 'Прихожая', link: 'ideas' },
      { title: 'Кухня', link: 'about' },
      { title: 'Детская', link: 'store' },
      { title: 'Кабинет', link: 'store' },
    ],
  },
  {
    title: 'Детская',
    link: 'store',
    dropDown: [
      { title: 'Диваны и кресла', link: 'ideas' },
      { title: 'Шкафы', link: 'about' },
      { title: 'Спальня', link: 'store' },
      { title: 'Гостиная', link: 'catalog' },
      { title: 'Прихожая', link: 'ideas' },
      { title: 'Кухня', link: 'about' },
      { title: 'Детская', link: 'store' },
      { title: 'Кабинет', link: 'store' },
    ],
  },
  {
    title: 'Кабинет',
    link: 'store',
    dropDown: [
      { title: 'Диваны и кресла', link: 'ideas' },
      { title: 'Шкафы', link: 'about' },
      { title: 'Спальня', link: 'store' },
      { title: 'Гостиная', link: 'catalog' },
      { title: 'Прихожая', link: 'ideas' },
      { title: 'Кухня', link: 'about' },
      { title: 'Детская', link: 'store' },
      { title: 'Кабинет', link: 'store' },
    ],
  },
];

const Header: FC<HeaderProps> = () => {
  return (
    <div className={styles.header}>
      <div>
        <SiteNav siteNavList={siteNavList} />
      </div>
      <div>
        <MainNav mainNavList={mainNavList} />
      </div>
    </div>
  );
};

export default memo(Header);
