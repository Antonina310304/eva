import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import Input from '@UI/Input';

import cn from 'classnames';
import useMediaQuery from '@Hooks/useMediaQuery';
import useOnClickOutside from '@Hooks/useOnClickOutside';
import styles from './Search.module.css';

export interface SearchData extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Search: FC<SearchData> = ({ className }) => {
  // eslint-disable-next-line
  const [isHowModal, setIsHowModal] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [isShowInput, setIsShowInput] = useState(false);

  const myRef = useRef<HTMLFormElement>();
  // eslint-disable-next-line
  const inputRef = useRef<HTMLFormElement>();

  function handleClickOutside(evt: MouseEvent) {
    if (!myRef.current.contains(evt.target as Node)) {
      setIsHowModal(false);
    }
  }

  const handleClickInside = () => setIsHowModal(true);

  function showSearchInput() {
    setIsShowInput(true);
  }

  function hideSearchInput() {
    setIsShowInput(false);
  }

  const mainRef = useOnClickOutside(hideSearchInput, !isShowInput);

  function getInput() {
    if (isMobile) {
      return (
        <div
          ref={mainRef}
          className={cn(styles.inputWrapper, { [styles.show]: isShowInput === true })}
        >
          <Input onFocus={handleClickInside} className={styles.searchMobile} type='input' />
          <button className={styles.button} type='button' onClick={() => showSearchInput()}>
            открыть поиск
          </button>
          <button className={cn(styles.button, styles.submit)} type='submit'>
            найти
          </button>
        </div>
      );
    }
    return (
      <div className={styles.inputBlock}>
        <Input
          className={styles.searchMobile}
          placeholder='Найти мебель'
          type='input'
          onFocus={handleClickInside}
        />
        <button className={cn(styles.button, styles.submit)} type='submit'>
          найти
        </button>
      </div>
    );
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <form ref={myRef} className={cn(styles.wrapper, className)} onClick={handleClickInside}>
      {getInput()}
      <div
        className={cn(styles.modal, {
          // [styles.show]: isHowModal === true,
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
