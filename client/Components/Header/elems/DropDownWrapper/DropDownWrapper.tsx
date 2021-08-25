// TODO обертка для меню 2 уровня - поведение закрытие меню и кнопка назад
import React, { FC, HTMLAttributes, ReactChildren } from 'react';
import styles from './DropDownWrapper.module.css';

export interface DropDownWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactChildren;
}
const DropDownWrapper: FC<DropDownWrapperProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default DropDownWrapper;
