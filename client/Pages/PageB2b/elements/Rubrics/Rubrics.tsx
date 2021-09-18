import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import Image from '@UI/Image';
import styles from './Rubrics.module.css';
import { RubricsItem } from '../../typings';

export interface RubricsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  rubrics: RubricsItem[];
}

const Rubrics: FC<RubricsProps> = (props) => {
  const { className, rubrics, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      {rubrics.map((item, index) => (
        <div className={styles.rubricsItem} key={index}>
          <div className={styles.picWrapper}>
            <Image className={styles.rubricsPic} src={item.src} />
          </div>
          <Link className={styles.rubricsTitle} to={item.link}>
            {item.title}
          </Link>
          <div className={styles.rubricsContent}>{item.text}</div>
        </div>
      ))}
    </div>
  );
};

export default memo(Rubrics);
