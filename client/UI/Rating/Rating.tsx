import {
  HTMLAttributes,
  FC,
  MouseEvent,
  useMemo,
  useState,
  memo,
  useEffect,
  useCallback,
} from 'react';
import cn from 'classnames';

import List from '@UI/List';
import styles from './Rating.module.css';

export type OnChangeStarCallback = (e: MouseEvent, index: number) => void;

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  className?: string;
  name?: string;
  defaultValue?: number;
  value?: number;
  countStars?: number;
  size?: 's' | 'm';
  scored?: boolean;
  editable?: boolean;
  onChange?: OnChangeStarCallback;
}

const Rating: FC<RatingProps> = (props) => {
  const {
    className,
    name,
    defaultValue,
    value,
    countStars = 5,
    size = 's',
    scored,
    editable,
    onChange,
    ...restProps
  } = props;
  const [selectedStar, setSelectedStar] = useState(defaultValue || value);

  const stars: number[] = useMemo(() => {
    return new Array(countStars).fill('').map((_, index) => index);
  }, [countStars]);

  const handleClickStar: OnChangeStarCallback = useCallback(
    (e, index) => {
      if (!editable) return;

      setSelectedStar(index);
      if (onChange) onChange(e, index);
    },
    [editable, onChange],
  );

  useEffect(() => {
    if (!value) return;

    setSelectedStar(value);
  }, [value]);

  return (
    <div
      {...restProps}
      className={cn(
        styles.rating,
        { [styles.sizeS]: size === 's', [styles.sizeM]: size === 'm', [styles.editable]: editable },
        className,
      )}
    >
      <input hidden type='text' name={name} value={selectedStar} readOnly />
      <div className={styles.wrapperList}>
        <List
          className={styles.backgroundList}
          items={stars}
          renderChild={() => <div className={cn(styles.star)} />}
        />
        <List
          className={styles.mainList}
          style={{ width: `${((selectedStar * 100) / countStars).toFixed(2)}%` }}
          items={stars}
          renderChild={(star: number) => (
            <div
              className={cn(styles.star, { [styles.selected]: true })}
              onClick={(e: MouseEvent) => handleClickStar(e, star)}
            />
          )}
        />
      </div>
      {scored && <div className={styles.score}>{`${value}/${countStars}`}</div>}
    </div>
  );
};

export default memo(Rating);
