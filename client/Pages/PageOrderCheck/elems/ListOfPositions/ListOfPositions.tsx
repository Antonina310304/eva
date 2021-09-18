import { FC, HTMLAttributes, memo, useMemo } from 'react';
import cn from 'classnames';

import { useCart } from '@Stores/Cart';
import Position from '../Position';
import RemovedPosition from '../RemovedPosition';
import styles from './ListOfPositions.module.css';

export interface ListOfPositionsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ListOfPositions: FC<ListOfPositionsProps> = (props) => {
  const { className, ...restProps } = props;
  const cart = useCart();

  const allPositions = useMemo(() => {
    if (cart.network !== 'success') return [];

    return [...cart.positions, ...cart.removedPositions];
  }, [cart.network, cart.positions, cart.removedPositions]);

  return (
    <div {...restProps} className={cn(styles.list, className)}>
      {allPositions.map((position) => {
        const removed = cart.removedPositions.includes(position);

        return (
          <div className={cn(styles.position, { [styles.removed]: removed })} key={position.id}>
            {removed ? <RemovedPosition position={position} /> : <Position position={position} />}
          </div>
        );
      })}
    </div>
  );
};

export default memo(ListOfPositions);
