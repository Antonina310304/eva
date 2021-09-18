import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ServicePageParagraphTitle from '@Components/ServicePageParagraphTitle';
import styles from './ListBlock.module.css';

export interface ListBlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  list: string[];
  nuance?: string;
}

const ListBlock: FC<ListBlockProps> = (props) => {
  const { className, title, list, nuance, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.listBlock, className)}>
      <ServicePageParagraphTitle title={title} />

      <ul className={styles.list}>
        {list.map((item, index) => (
          <li
            className={styles.listItem}
            key={index}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </ul>

      {nuance && <div className={styles.nuance}>{nuance}</div>}
    </div>
  );
};

export default memo(ListBlock);
