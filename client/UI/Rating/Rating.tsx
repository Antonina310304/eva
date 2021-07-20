import React, {
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

export interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  defaultValue?: number;
  value?: number;
  countStars?: number;
  size?: 's' | 'm';
  scored?: boolean;
  onChangeStar?: OnChangeStarCallback;
}

const Rating: FC<RatingProps> = (props) => {
  const {
    className,
    defaultValue,
    value,
    countStars = 5,
    size = 's',
    scored,
    onChangeStar,
    ...restProps
  } = props;
  const [selectedStar, setSelectedStar] = useState(defaultValue || value);

  const stars: number[] = useMemo(() => {
    const items = [];

    for (let i = 0; i < countStars; i += 1) {
      items.push(i);
    }

    return items;
  }, [countStars]);

  const handleClickStar: OnChangeStarCallback = useCallback(
    (e, index) => {
      if (onChangeStar) onChangeStar(e, index);
    },
    [onChangeStar],
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
        { [styles.sizeS]: size === 's', [styles.sizeM]: size === 'm' },
        className,
      )}
    >
      <List
        className={styles.list}
        items={stars}
        renderChild={(star: number) => {
          const selected = star < selectedStar;

          return (
            <div
              className={cn(styles.star, { [styles.selected]: selected })}
              onClick={(e: MouseEvent) => handleClickStar(e, star)}
            />
          );
        }}
      />
      {scored && <div className={styles.score}>{`${value}/${countStars}`}</div>}
    </div>
  );
};

export default memo(Rating);
