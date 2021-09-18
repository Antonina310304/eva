import { FC, HTMLAttributes, memo, useCallback, MouseEvent } from 'react';
import cn from 'classnames';

import styles from './GalleryDots.module.css';

export interface GalleryDotsProps extends HTMLAttributes<HTMLUListElement> {
  className?: string;
  count: number;
  actived: number;
  onChangeSlide?: (e: MouseEvent, index: number) => void;
}

const GalleryDots: FC<GalleryDotsProps> = (props) => {
  const { className, count, actived, onChangeSlide } = props;

  const handleChangeSlide = useCallback(
    (e, index) => {
      if (onChangeSlide) onChangeSlide(e, index);
    },
    [onChangeSlide],
  );

  return (
    <ul className={styles.dots}>
      {new Array(count).fill('').map((_item, index) => (
        <li
          className={cn(styles.item, { [styles.actived]: actived === index }, className)}
          key={index}
          onClick={(e) => handleChangeSlide(e, index)}
        >
          {index}
        </li>
      ))}
    </ul>
  );
};

export default memo(GalleryDots);
