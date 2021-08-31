import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import Input from '@UI/Input';

import cn from 'classnames';
import useMediaQuery from '@Hooks/useMediaQuery';

import ModalSearch from '@Components/Header/elems/Search/elems/ModalSearch';
import { hits, offers, products, searchResult, viewed } from '@Components/Header/elems/Search/data';
import ModalSearchContent from '@Components/Header/elems/Search/elems/ModalSearchContent';
import styles from './Search.module.css';

export interface SearchData extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Search: FC<SearchData> = ({ className }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1366px)');
  const [isShowInput, setIsShowInput] = useState(false);

  const inputRef = useRef<HTMLDivElement>();
  const formRef = useRef<HTMLFormElement>();

  function hideModal() {
    setIsShowModal(false);
    setIsShowInput(false);
    document.querySelector('body').style.overflow = '';
  }

  const handleClickInside = () => {
    setIsShowModal(true);
    if (!isDesktop) {
      document.querySelector('body').style.overflow = 'hidden';
    }
  };

  function showSearchInput() {
    setIsShowInput(true);
  }

  function handleClickOutside(evt: MouseEvent) {
    if (!formRef.current.contains(evt.target as Node)) {
      hideModal();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <form ref={formRef} className={cn(styles.search, className)}>
      <div
        ref={inputRef}
        className={cn({
          [styles.show]: isShowInput === true,
          [styles.changeable]: isMobile,
          [styles.wrapper]: !isMobile,
        })}
      >
        <Input
          onFocus={handleClickInside}
          className={styles.input}
          type='input'
          placeholder='Найти мебель'
        />
        {isMobile && (
          <button className={styles.button} type='button' onClick={() => showSearchInput()}>
            открыть поиск
          </button>
        )}

        <button className={cn(styles.button, styles.submit)} type='submit'>
          найти
        </button>
      </div>

      <ModalSearch hideModal={hideModal} isShowModal={isShowModal}>
        <ModalSearchContent request={searchResult} hits={hits} viewed={viewed} offers={offers} />
      </ModalSearch>
    </form>
  );
};

export default Search;
