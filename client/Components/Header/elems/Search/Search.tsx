import React, {
  FC,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
  memo,
  useCallback,
  lazy,
  Suspense,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import cn from 'classnames';

import Input from '@UI/Input';
import IconClose from '@UI/IconClose';
import { hits, offers, viewed } from '@Components/Header/elems/Search/data';
import { SearchResultData } from '@Types/SearchResultData';
import useOnClickOutside from '@Hooks/useOnClickOutside';
import useMedias from '@Hooks/useMedias';
import styles from './Search.module.css';

export interface SearchData extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  isMenu?: boolean;
}

const ModalSearch = lazy(() => import('./elems/ModalSearch'));
const ModalSearchContent = lazy(() => import('./elems/ModalSearchContent'));

const Search: FC<SearchData> = ({ className, isMenu }) => {
  const { isMobile, isOnlyDesktop } = useMedias();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowInput, setIsShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResultData>({
    request: '',
    matches: [],
    products: [],
  });

  const inputRef = useRef<HTMLInputElement>();

  const [debouceChangeValue] = useDebouncedCallback(async (value: string) => {
    // для тестирования случаев когда есть результаты, на все остальные результат пустой
    if (value === 'диваны') {
      setSearchResult({
        request: value,
        matches: [
          { title: 'Диваны Динс', link: 'divans' },
          { title: 'Кресла Динс', link: 'chairs' },
        ],
        products: [
          {
            id: 0,
            img: '/react/static/img/products/product1.png',
            link: 'link',
            name: 'Диван угловой Росис Velvet Blue',
            price: 19990,
          },
          {
            id: 1,
            img: '/react/static/img/products/product1.png',
            link: 'link',
            name: 'Шерона 140 Sherst Beige',
            price: 24640,
          },
        ],
      });
    } else {
      setSearchResult({ request: value, matches: [], products: [] });
    }
  }, 400);

  const resetSearch = useCallback(() => {
    setSearchValue('');
    setSearchResult({ request: '', matches: [], products: [] });
  }, []);

  const hideModal = useCallback(() => {
    setIsShowModal(false);
    setIsShowInput(false);
    resetSearch();
  }, [resetSearch]);

  const handleClickSearch = useCallback(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      debouceChangeValue(searchValue);
    },
    [debouceChangeValue, searchValue],
  );

  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;

      setSearchValue(value);
      debouceChangeValue(value);
    },
    [debouceChangeValue],
  );

  const handleFocus = useCallback(() => {
    setTimeout(() => {
      setIsShowModal(true);
      setIsShowInput(true);
    }, 100);
  }, []);

  // Блокируем скролл на странице
  useEffect(() => {
    function cleanup() {
      document.documentElement.style.overflow = '';
    }

    if (isOnlyDesktop || !isShowModal) return cleanup;

    document.documentElement.style.overflow = 'hidden';

    return cleanup;
  }, [isOnlyDesktop, isShowModal]);

  const refPopup = useOnClickOutside(hideModal, !isShowModal);

  return (
    <form className={cn(styles.search, className)} onSubmit={handleSubmit}>
      <div
        className={cn(styles.inputWrapper, {
          [styles.show]: isShowInput,
          [styles.changeable]: isMobile && !isMenu,
          [styles.wrapper]: !isMobile,
        })}
      >
        <Input
          className={styles.input}
          type='input'
          value={searchValue}
          placeholder='Найти мебель'
          ref={inputRef}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        {searchValue !== '' && (
          <button className={styles.buttonReset} type='button' onClick={resetSearch}>
            <IconClose className={styles.iconReset} />
            очистить
          </button>
        )}

        {isMobile && !isMenu && (
          <button className={styles.button} type='button' onClick={handleClickSearch}>
            открыть поиск
          </button>
        )}

        <button className={cn(styles.button, styles.submit)} type='submit'>
          найти
        </button>
      </div>

      {isShowModal && (
        <Suspense fallback={null}>
          <ModalSearch visible={isShowModal} ref={refPopup} onClose={hideModal}>
            <ModalSearchContent
              request={searchResult}
              hits={hits}
              viewed={viewed}
              offers={offers}
            />
          </ModalSearch>
        </Suspense>
      )}
    </form>
  );
};

export default memo(Search);
