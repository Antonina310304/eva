import React, { useCallback, useState, useRef, FC, HTMLAttributes, ChangeEvent, memo } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import cn from 'classnames';

import * as ApiMeta from '@Api/Meta';
import Input from '@UI/Input';
import { RegionHintData } from '@Types/Region';
import styles from './Search.module.css';

export interface Example {
  regionId: number;
  title: string;
}

export interface SearchProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  examples?: Example[];
  onChangeHints?: (hints: RegionHintData[]) => void;
  onChangeQuery?: (e: ChangeEvent, query: string) => void;
}

const Search: FC<SearchProps> = (props) => {
  const { className, examples, onChangeQuery, onChangeHints, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const abortController = useRef<AbortController>(null);

  const [debounceCity] = useDebouncedCallback(async (term: string) => {
    setLoading(true);

    try {
      // Отменяем предыдущий запрос
      if (abortController.current) {
        abortController.current.abort();
      }

      abortController.current = new AbortController();

      const hints = await ApiMeta.getRegionHints(
        { term: term.toLowerCase().trim() },
        { signal: abortController.current.signal },
      );

      if (hints.length > 0) {
        setError(null);
        if (onChangeHints) onChangeHints(hints);
      } else {
        setError('Введенный вами город не найден');
      }
    } catch (err) {
      // Запрос был прерван нами, ошибкой не считаем
      if (err.name === 'AbortError') return;

      setError('Неизвестная ошибка, повторите ещё раз');
    }

    setLoading(false);
  }, 400);

  const handleChangeCity = useCallback(
    (e) => {
      const val = e.target.value;

      if (!val || val.length < 3) {
        if (onChangeHints) onChangeHints(null);
        setLoading(false);
        setError(null);
      } else {
        debounceCity(val);
      }

      setValue(val.trim());
      if (onChangeQuery) onChangeQuery(e, val.trim());
    },
    [debounceCity, onChangeHints, onChangeQuery],
  );

  return (
    <div {...restProps} className={cn(styles.search, className)}>
      <Input
        autoFocus
        rounded
        className={styles.input}
        error={error}
        placeholder='Выберите город'
        type='text'
        autoComplete='off'
        value={value}
        before={<div className={styles.iconSearch} />}
        onChange={handleChangeCity}
      />
    </div>
  );
};

export default memo(Search);
