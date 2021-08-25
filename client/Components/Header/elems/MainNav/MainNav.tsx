import React from 'react';
import { mainNavList } from '@Components/Header/data';
import DropDownWrapper from '@Components/Header/elems/DropDownWrapper';
import styles from './MainNav.module.css';

// TODO сделать навигацию каталога
// TODO Удалить key index
const MainNav = () => {
  return (
    <div>
      <ul className={styles.mainNav}>
        {mainNavList.map((item) => {
          return (
            <li key={item.title}>
              <p>{item.title}</p>
              <DropDownWrapper>
                {item.dropDown.map((i, index) => (
                  <p key={index}>{i.title}</p>
                ))}
              </DropDownWrapper>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MainNav;
