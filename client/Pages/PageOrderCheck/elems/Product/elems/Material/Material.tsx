import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import styles from './Material.module.css';

export interface MaterialData {
  description: string;
  image: string;
  name: string;
  title: string;
}

export interface MaterialProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  material?: MaterialData;
}

const Material: FC<MaterialProps> = (props) => {
  const { className, material, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.material, className)}>
      <div className={styles.title}>{`${material.title}:`}</div>
      <Image className={styles.image} src={material.image} />
      {material.name}
    </div>
  );
};

export default memo(Material);
