import React from 'react';
import { userMenu } from '@Components/Header/data';
import styles from './UserMenuMobile.module.css';

// TODO поменять key
const UserMenuMobile = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {userMenu.map((item, ind) => {
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

export default UserMenuMobile;
