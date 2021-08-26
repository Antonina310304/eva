import React, { useCallback, memo } from 'react';

import Image from '@divanru/ts-ui/Image';
import cn from '@divanru/ts-ui/cn';

import './ThumbnailsItem.css';

const b = cn('ThumbnailsItem');

const ThumbnailsItemItem = ({
  className,
  src,
  type = 'image',
  id,
  index,
  isActive,
  onClick,
  visible_items,
  client,
  ...props
}) => {
  const handleClickItem = useCallback(
    (e) => {
      if (onClick) {
        onClick(e, { id, type, index });
      }
    },
    [id, type, index, onClick],
  );

  return (
    <div
      {...props}
      className={b({ active: isActive }, [className])}
      style={visible_items ? { width: `${100 / visible_items}%` } : null}
    >
      <Image onClick={handleClickItem} className={b('Img', { client })} src={src} />
      {type === 'video' && (
        <Image
          src='/react/static/icons/play.svg'
          className={b('IconPlay')}
          onClick={handleClickItem}
        />
      )}
    </div>
  );
};

export default memo(ThumbnailsItemItem);
