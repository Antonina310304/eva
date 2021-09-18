import { FC, memo } from 'react';

import { SubCategoryProps } from '@Pages/PageSiteMapFull/typings';
import Link from '@UI/Link';
import styles from './ListItem.module.css';

const ListItem: FC<SubCategoryProps> = (props) => {
  const { title, items, url } = props;

  return (
    <li className={styles.itemDetail}>
      <Link className={styles.titleDetail} to={url}>
        {title}
        <>:</>
      </Link>
      <ul className={styles.sublistDetail}>
        {items.map((paramLink, linkIndex) => {
          return (
            <li key={linkIndex} className={styles.subitemDetail}>
              <Link className={styles.linkDetail} to={paramLink.url}>
                {paramLink.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default memo(ListItem);
