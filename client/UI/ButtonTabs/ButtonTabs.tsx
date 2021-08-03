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

import Gallery from '@UI/Gallery';
import styles from './ButtonTabs.module.css';

export type TabId = string;

export interface Tab {
  id: TabId;
  label: string;
}

export interface ContainerProps {
  className?: string;
  cnViewport?: string;
  scrollable?: boolean;
}

export interface ButtonTabsProps extends HTMLAttributes<HTMLDivElement>, ContainerProps {
  tabs: Tab[];
  defaultValue?: TabId;
  value?: TabId;
  inversed?: boolean;
  onChangeTab?: (e: MouseEvent, tab: Tab) => void;
}

const Container: FC<ContainerProps> = (props) => {
  const { scrollable, cnViewport, children, ...restProps } = props;

  return scrollable ? (
    <Gallery {...restProps} cnViewport={cnViewport}>
      {children}
    </Gallery>
  ) : (
    <div {...restProps}>{children}</div>
  );
};

const ButtonTabs: FC<ButtonTabsProps> = (props) => {
  const {
    className,
    defaultValue,
    value,
    tabs,
    inversed,
    scrollable,
    onChangeTab,
    ...restProps
  } = props;
  const [selectedTab, setSelectedTab] = useState<TabId>(defaultValue || value);

  const handleClickTab = useCallback(
    (e: MouseEvent, tab: Tab) => {
      if (window.cancelClick) return;

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
    <Container
      {...restProps}
      className={cn(
        styles.tabs,
        { [styles.inversed]: inversed, [styles.scrollable]: scrollable },
        className,
      )}
      cnViewport={styles.galleryViewport}
      scrollable={scrollable}
    >
      {tabs.map((tab) => {
        const selected = tab.id === selectedTab;

        return (
          <div className={styles.item} key={tab.id}>
            <button
              className={cn(styles.button, { [styles.selected]: selected })}
              type='button'
              onClick={(e: MouseEvent) => handleClickTab(e, tab)}
            >
              <span className={styles.boldText}>{tab.label}</span>
              <span className={styles.text}>{tab.label}</span>
            </button>
          </div>
        );
      })}
    </Container>
  );
};

export default memo(ButtonTabs);
