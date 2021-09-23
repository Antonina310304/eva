import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import { PrintsData } from '@Types/PrintOffers';
import styles from './Tabs.module.css';

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  tabList: PrintsData[];
  activeIdTab: string;
  handlerClick: (arg: string) => void;
}
const Tabs: FC<TabsProps> = ({ className, tabList, activeIdTab, handlerClick }) => {
  return (
    <div className={cn(className, styles.tabs)}>
      {tabList.map((tab) => {
        const activeTab = tab.id === activeIdTab;
        return (
          <div
            key={tab.id}
            className={cn(styles.tab, activeTab && styles.activeTab)}
            onClick={() => handlerClick(tab.id)}
          >
            <p className={styles.preview} style={{ backgroundImage: `url(${tab.pattern})` }} />
            <p className={styles.tabName}>{tab.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Tabs);
