import React, { FC, HTMLAttributes, memo, useCallback, MouseEvent } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import styles from './FavoriteRegions.module.css';

export interface FavoriteRegionsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  regions: any[];
  onSelectRegion?: (e: MouseEvent, region: any) => void;
}

const FavoriteRegions: FC<FavoriteRegionsProps> = (props) => {
  const { className, regions, onSelectRegion, ...restProps } = props;

  const handleClickRegion = useCallback(
    (e, region) => {
      if (onSelectRegion) onSelectRegion(e, region);
    },
    [onSelectRegion],
  );

  return (
    <div {...restProps} className={cn(styles.regions, className)}>
      {regions.map((region, index) => (
        <Link
          className={cn(styles.link, { [styles.flagman]: region.flagman })}
          preventDefault
          key={index}
          to='#'
          view='simple'
          onClick={(e) => handleClickRegion(e, region)}
        >
          {region.name}
        </Link>
      ))}
    </div>
  );
};

export default memo(FavoriteRegions);
