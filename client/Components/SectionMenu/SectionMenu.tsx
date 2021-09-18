import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './SectionMenu.module.css';

export interface ListTitlesItemProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  active?: boolean;
  href?: string;
  count?: string;
}

export interface SectionMenuProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  items: ListTitlesItemProps[];
}

const SectionMenu: FC<SectionMenuProps> = (props) => {
  const { className, items, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.sectionMenu, {}, className)}>
      {items.map((item, index) => (
        <div className={styles.item} key={index}>
          <a className={cn(styles.link, { [styles.active]: item.active })} href={item.href}>
            {item.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default memo(SectionMenu);
