import React, { FC, HTMLAttributes, useEffect, useRef, useState, memo, useCallback } from 'react';
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

export interface SearchData extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  isMenu?: boolean;
}

const Search: FC<SearchData> = ({ className, isMenu = false }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDesktop = useMediaQuery('(min-width: 1366px)');
  const [isShowInput, setIsShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResultData>({
    request: '',
    link: '',
    matches: [],
    products: [],
  });

  const debounceRef = useRef<ReturnType<typeof _debounce>>();

  const inputRef = useRef<HTMLDivElement>();
  const formRef = useRef<HTMLFormElement>();

  useEffect(() => {
    debounceRef.current = _debounce((value) => {
      setSearchResult((prev) => ({ ...prev, ...value }));
    }, 1500);
  }, [setSearchResult]);

  const resetSearch = useCallback(() => {
    setSearchValue('');
    setSearchResult({ request: '', link: '', matches: [], products: [] });
  }, []);

  const hideModal = useCallback(() => {
    setIsShowModal(false);
    setIsShowInput(false);
    resetSearch();
    document.querySelector('body').style.overflow = '';
  }, [resetSearch]);

  const handleClickInside = (evt: { target: { value: string } }) => {
    setIsShowModal(true);
    if (!isDesktop) {
      document.querySelector('body').style.overflow = 'hidden';
    }
  };

  const showSearchInput = useCallback(() => {
    setIsShowInput(true);
  }, []);

  const handleClickOutside = useCallback(
    (evt: MouseEvent) => {
      if (!formRef.current.contains(evt.target as Node)) {
        hideModal();
      }
    },
    [hideModal],
  );

  function subscribeToChangeInput(value) {
    if (!debounceRef.current) return;
    if (value === '') return;

    // для тестирования случаев когда есть результаты, на все остальные результат пустой
    if (value === 'диваны') {
      debounceRef.current({
        request: value,
        matches: [
          { title: 'Диваны Динс', link: 'divans' },
          { title: 'Кресла Динс', link: 'chairs' },
        ],
        products: [
          {
            id: 0,
            img: 'react/static/img/products/product1.png',
            link: 'link',
            name: 'Диван угловой Росис Velvet Blue',
            price: 19990,
          },
          {
            id: 1,
            img: 'react/static/img/products/product1.png',
            link: 'link',
            name: 'Шерона 140 Sherst Beige',
            price: 24640,
          },
        ],
      });
    } else {
      debounceRef.current({ request: value, matches: [], products: [] });
    }
    setSearchValue(value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    subscribeToChangeInput(searchValue);
  }

  function onChange(evt: { target: { value: string } }) {
    const { value } = evt.target;
    subscribeToChangeInput(value);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <form ref={formRef} className={cn(styles.search, className)} onSubmit={onSubmit}>
      <div
        ref={inputRef}
        className={cn({
          [styles.show]: isShowInput,
          [styles.changeable]: isMobile && !isMenu,
          [styles.wrapper]: !isMobile,
        })}
      >
        <Input
          onFocus={(evt) => !isMenu && handleClickInside(evt)}
          onChange={(evt) => !isMenu && onChange(evt)}
          className={styles.input}
          type='input'
          defaultValue={searchValue}
          placeholder='Найти мебель'
        />
        {searchValue !== '' && (
          <button className={styles.buttonReset} type='button' onClick={resetSearch}>
            <IconClose className={styles.iconReset} />
            очистить
          </button>
        )}

        {isMobile && !isMenu && (
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
