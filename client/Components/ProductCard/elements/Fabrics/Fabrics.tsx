import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import styles from './Fabrics.module.css';

export interface FabricData {
  image: string;
}

export interface FabricsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  fabrics?: FabricData[];
}

const Fabrics: FC<FabricsProps> = (props) => {
  const { className, fabrics, ...restProps } = props;

  return (
    <List
      {...restProps}
      className={cn(styles.fabrics, className)}
      items={fabrics}
      renderChild={(fabric: FabricData) => <div />}
    />
  );
};

export default memo(Fabrics);
