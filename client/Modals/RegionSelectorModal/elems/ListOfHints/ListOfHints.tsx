import { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import { RegionHintData } from '@Types/Region';
import styles from './ListOfHints.module.css';

export interface ListOfHintsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  query: string;
  regions: RegionHintData[];
  onSelectRegion?: (e: MouseEvent, region: RegionHintData) => void;
}

const ListOfHints: FC<ListOfHintsProps> = (props) => {
  const { className, query, regions, onSelectRegion, ...restProps } = props;

  const handleSelectRegion = useCallback(
    (e, region) => {
      if (onSelectRegion) onSelectRegion(e, region);
    },
    [onSelectRegion],
  );

  return (
    <div {...restProps} className={cn(styles.hints, className)}>
      {regions.map((region, index) => {
        const textes = [region.name];

        if (region.region) {
          textes.push(region.region);
        }

        const fullAddress = textes.join(', ');
        const mainChunk = fullAddress.substr(0, query.length);
        const secondChunk = fullAddress.substr(query.length);

        return (
          <div className={styles.hint} key={index} onClick={(e) => handleSelectRegion(e, region)}>
            <span className={styles.mainChunk}>{mainChunk}</span>
            <span className={styles.secondChunk}>{secondChunk}</span>
          </div>
        );
      })}
    </div>
  );
};

export default memo(ListOfHints);
