import { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import { IMainNav } from '@Types/MainNav';
import MainNavItem from '../MainNavItem';
import styles from './MainNav.module.css';

export interface MainNavProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  isFirstClick: boolean;
  hideOnScroll: boolean;
  setIsFirstClick: (arg: boolean) => void;
  mainNavList: IMainNav[];
}

const MainNav: FC<MainNavProps> = ({
  mainNavList,
  hideOnScroll,
  isFirstClick,
  setIsFirstClick,
  className,
}) => {
  const onMouseLeave = useCallback(() => {
    setIsFirstClick(false);
  }, [setIsFirstClick]);

  return (
    <div className={className}>
      <div onMouseLeave={onMouseLeave} className={cn(styles.wrap, styles.mainNav)}>
        {mainNavList.map((item) => {
          return (
            <MainNavItem
              key={item.title}
              mainNavItem={item}
              hideOnScroll={hideOnScroll}
              isFirstClick={isFirstClick}
              setIsFirstClick={setIsFirstClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(MainNav);
