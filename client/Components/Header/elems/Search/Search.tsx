import React, { FC, HTMLAttributes, useEffect, useRef, useState, memo } from 'react';
import Input from '@UI/Input';

import cn from 'classnames';
import useMediaQuery from '@Hooks/useMediaQuery';

import ModalSearch from '@Components/Header/elems/Search/elems/ModalSearch';
import { hits, offers, viewed } from '@Components/Header/elems/Search/data';
import ModalSearchContent from '@Components/Header/elems/Search/elems/ModalSearchContent';
import IconClose from '@UI/IconClose';
import { SearchResultData } from '@Types/SearchResultData';

import _debounce from 'lodash.debounce';
import styles from './Search.module.css';

// eslint-disable-next-line @typescript-eslint/no-var-requires

export interface SearchData extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Search: FC<SearchData> = ({ className }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1366px)');
  const [isShowInput, setIsShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResultData>({
    request: '',
    link: '',
    matches: [],
    products: [],
  });

  const inputRef = useRef<HTMLDivElement>();
  const formRef = useRef<HTMLFormElement>();

  function resetSearch() {
    setSearchValue('');
    setSearchResult({ request: '', link: '', matches: [], products: [] });
  }

  function hideModal() {
    setIsShowModal(false);
    setIsShowInput(false);
    resetSearch();
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

  function onChange(evt: { target: { value: string } }) {
    const { value } = evt.target;
    setSearchValue(value);
    _debounce(() => {
      setSearchResult({ ...searchResult, request: value });
    }, 1000)();
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
          daat-test='asdfasfd'
          onFocus={handleClickInside}
          onChange={onChange}
          className={styles.input}
          type='input'
          value={searchValue}
          placeholder='Найти мебель'
        />
        {searchValue !== '' && (
          <button className={styles.buttonReset} type='button' onClick={resetSearch}>
            <IconClose className={styles.iconReset} />
            очистить
          </button>
        )}

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

export default memo(Search);
