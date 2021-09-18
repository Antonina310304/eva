import { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import Image from '@UI/Image';
import styles from './Fabrics.module.css';

export interface FabricData {
  image: string;
}

export interface FabricsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  fabrics: FabricData[];
  defaultSelectedFabric?: FabricData;
  size?: 's' | 'm';
}

const Fabrics: FC<FabricsProps> = (props) => {
  const { className, fabrics, defaultSelectedFabric, size = 's', ...restProps } = props;
  const [selectedFabric, setSelectedFabric] = useState(defaultSelectedFabric);

  const handleClickFabric = useCallback((_, clickedFabric) => {
    setSelectedFabric(clickedFabric);
  }, []);

  return (
    <List
      {...restProps}
      className={cn(
        styles.fabrics,
        {
          [styles.sizeS]: size === 's',
          [styles.sizeM]: size === 'm',
        },
        className,
      )}
      items={fabrics}
      renderChild={(fabric: FabricData) => (
        <Image
          className={cn(styles.fabric, { [styles.selected]: fabric === selectedFabric })}
          src={fabric.image}
          onClick={(e) => handleClickFabric(e, fabric)}
        />
      )}
    />
  );
};

export default memo(Fabrics);
