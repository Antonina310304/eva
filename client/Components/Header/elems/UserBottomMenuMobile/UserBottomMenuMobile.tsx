import React, { memo } from 'react';
import { userBottomMenu } from '@Components/Header/data';
import styles from './UserBottomMenuMobile.module.css';

// TODO поменять key
const UserBottomMenuMobile = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {userBottomMenu.map((item, ind) => {
          return (
            <li key={ind} className={styles.item}>
              <p
                style={{ backgroundImage: `url(react/static/img/userMenu/${item.icon})` }}
                className={styles.icon}
              />
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(UserBottomMenuMobile);
