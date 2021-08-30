import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import Input from '@UI/Input';

import cn from 'classnames';
import styles from './Search.module.css';

export interface SearchData extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Search: FC<SearchData> = ({ className }) => {
  const [isHowModal, setIsHowModal] = useState(false);

  function onFocus() {
    setIsHowModal(true);
  }
  const myRef = useRef<HTMLFormElement>();

  function handleClickOutside(evt: MouseEvent) {
    if (!myRef.current.contains(evt.target as Node)) {
      setIsHowModal(false);
    }
  }

  const handleClickInside = () => setIsHowModal(true);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <form ref={myRef} className={cn(styles.wrapper, className)} onClick={handleClickInside}>
      <Input className={styles.search} placeholder='Найти мебель' type='input' onFocus={onFocus} />
      <button type='submit' className={styles.button} />
      <div
        className={cn(styles.modal, {
          [styles.show]: isHowModal === true,
        })}
      >
        <p>Предложения</p>
        <p>Хиты интернет продаж</p>
        <ul>
          <li>Диваны Динс</li>
          <li>Кресла Динс</li>
          <li>Серия мебели Динс</li>
          <li>Кушетки Динс</li>
          <li>Зеркальные шкафы</li>
        </ul>
      </div>
    </form>
  );
};

export default Search;
