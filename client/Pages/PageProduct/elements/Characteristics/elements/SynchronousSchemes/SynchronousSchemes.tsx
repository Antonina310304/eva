import { FC, HTMLAttributes, memo, useMemo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import Image from '@UI/Image';
import styles from './SynchronousSchemes.module.css';

export interface SchemeImage {
  url: string;
  width: number;
  height: number;
}

export interface SynchronousSchemesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  schemes: SchemeImage[];
}

const SynchronousSchemes: FC<SynchronousSchemesProps> = (props) => {
  const { className, schemes, ...restProps } = props;
  const sizes = useMemo(() => {
    let width = 0;
    let height = 0;

    schemes.forEach((scheme) => {
      width = width < scheme.width ? scheme.width : width;
      height = height < scheme.height ? scheme.height : height;
    });

    return { width, height };
  }, [schemes]);

  return (
    <List
      {...restProps}
      className={cn(styles.schemes, className)}
      items={schemes}
      renderChild={(image: SchemeImage) => (
        <Image
          src={image.url}
          className={styles.schemeImg}
          style={{ maxWidth: `${sizes.width}px` }}
        >
          <div
            className={styles.spacer}
            style={{ padding: `0 0 ${(sizes.height / sizes.width) * 100}%` }}
          />
        </Image>
      )}
    />
  );
};

export default memo(SynchronousSchemes);
