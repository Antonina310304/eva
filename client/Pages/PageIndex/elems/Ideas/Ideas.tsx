import React, { FC, HTMLAttributes, useMemo, useCallback, memo, useState } from 'react';

import ButtonTabs from '@UI/ButtonTabs/ButtonTabs';
import Button from '@UI/Button/Button';
import Section from '@Components/Section';
import { ImagesIdeasData } from '@Types/Ideas';
import Pin from './elems/Pin';
import styles from './Ideas.module.css';

export interface IdeasProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  ideas: ImagesIdeasData[];
}

const MAX_COUNT_IMAGE = 5;
const Ideas: FC<IdeasProps> = (props) => {
  const { className, title, ideas } = props;
  const [selectedTab, setSelectedTab] = useState('all');

  const tabsIdeas = useMemo(() => {
    const tabs = [{ id: 'all', label: 'Все идеи' }];

    ideas.forEach((p) => {
      const tab = tabs.find((t) => t.id === p.type);

      if (tab) return;

      tabs.push({ id: p.type, label: p.type });
    });

    return tabs;
  }, [ideas]);

  const filteredTabsIdeas = useMemo(() => {
    if (selectedTab === 'all') return ideas;

    return ideas.filter((p) => p.type === selectedTab);
  }, [ideas, selectedTab]);

  const handleChangeTab = useCallback(
    (_e, tab) => {
      setSelectedTab(tab.id);
    },
    [setSelectedTab],
  );

  return (
    <div className={className}>
      {title && <Section className={styles.title} title={title} />}

      <div className={styles.tabWrapper}>
        <ButtonTabs
          scrollable
          defaultValue={tabsIdeas[0].id}
          tabs={tabsIdeas}
          onChangeTab={handleChangeTab}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {filteredTabsIdeas.slice(0, MAX_COUNT_IMAGE).map((img) => (
            <div key={img.id} className={styles.imageItem}>
              <div className={styles.imageWrapper} style={{ backgroundImage: `url(${img.src})` }}>
                {img.pins.map((pin, index) => (
                  <Pin key={index} pin={pin} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTabsIdeas.length > MAX_COUNT_IMAGE && (
          <div className={styles.buttonMore}>
            <Button theme='blank'>Показать еще идеи</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Ideas);
