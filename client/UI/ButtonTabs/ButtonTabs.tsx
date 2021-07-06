import React, {
  FC,
  HTMLAttributes,
  MouseEvent,
  memo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import cn from 'classnames';

import List from '@UI/List';
import styles from './ButtonTabs.module.css';

export type TabId = string;

export interface Tab {
  id: TabId;
  label: string;
}

export interface ButtonTabsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  tabs: Tab[];
  defaultValue?: TabId;
  value?: TabId;
  onChangeTab?: (e: MouseEvent, tab: Tab) => void;
}

const ButtonTabs: FC<ButtonTabsProps> = (props) => {
  const { className, defaultValue, value, tabs, onChangeTab, ...restProps } = props;
  const [selectedTab, setSelectedTab] = useState<TabId>(defaultValue || value);

  const handleClickTab = useCallback(
    (e: MouseEvent, tab: Tab) => {
      if (onChangeTab) {
        onChangeTab(e, tab);
      }

      setSelectedTab(tab.id);
    },
    [onChangeTab],
  );

  useEffect(() => {
    if (!value) return;

    setSelectedTab(value);
  }, [value]);

  return (
    <List
      {...restProps}
      className={cn(styles.tabs, className)}
      items={tabs}
      renderChild={(tab: Tab) => {
        const selected = tab.id === selectedTab;

        return (
          <button
            className={cn(styles.button, { [styles.selected]: selected })}
            type='button'
            onClick={(e: MouseEvent) => handleClickTab(e, tab)}
          >
            <span className={styles.boldText}>{tab.label}</span>
            <span className={styles.text}>{tab.label}</span>
          </button>
        );
      }}
    />
  );
};

export default memo(ButtonTabs);
