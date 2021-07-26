import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import { ConstructorStubData } from '@Types/Category';
import styles from './ConstructorStub.module.css';

export interface ConstructorStubProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  stub: ConstructorStubData;
}

const ConstructorStub: FC<ConstructorStubProps> = (props) => {
  const { className, stub, ...restProps } = props;

  const handleOpenConstructor = useCallback(() => {
    console.log('open constructor');
  }, []);

  return (
    <div
      {...restProps}
      className={cn(styles.constructorStub, className)}
      onClick={handleOpenConstructor}
    >
      <div className={styles.icon} />

      <div className={styles.linkWrapper}>
        <Link className={styles.link} to='#' onClick={handleOpenConstructor}>
          {stub.title}
        </Link>
      </div>
    </div>
  );
};

export default memo(ConstructorStub);