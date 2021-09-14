import React, { FC, HTMLAttributes, useMemo, useCallback, memo, useState } from 'react';

import Container from '@Components/Container';
import cn from 'classnames';
import IdeasPopup from '@Pages/PageIndex/elems/Ideas/IdeasPopup/IdeasPopup';
import ButtonTabs from '@UI/ButtonTabs/ButtonTabs';
import Link from '@UI/Link/Link';
import Button from '@UI/Button/Button';
import { IdeasPostData } from '@Types/Ideas';
import Section from '@Components/Section/Section';
import styles from './Ideas.module.css';

export interface IdeasProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  ideasData: IdeasPostData;
}

const Ideas: FC<IdeasProps> = ({ className, ideasData }) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState({ imgId: -1, product: {} });
  const MAX_COUNT_IMAGE = 5;

  const tabsIdeas = useMemo(() => {
    if (!ideasData?.images) return [];

    const tabs = [{ id: 'all', label: 'Все идеи' }];

    ideasData.images.forEach((p) => {
      const tab = tabs.find((t) => t.id === p.type);

      if (tab) return;

      tabs.push({ id: p.type, label: p.type });
    });

    return tabs;
  }, [ideasData]);

  const onChangeTab = useCallback(
    (id) => {
      setSelectedProduct((prevState) => ({ ...prevState, imgId: -1 }));
      setSelectedTab(id);
    },
    [setSelectedTab, setSelectedProduct],
  );

  const filteredTabsIdeas = useMemo(() => {
    const images = ideasData?.images;

    if (!images) return [];
    if (selectedTab === 'all') return images;

    return images.filter((p) => {
      return p.type === selectedTab;
    });
  }, [ideasData, selectedTab]);

  return (
    <div className={className}>
      {ideasData.title && <Section className={styles.title} title={ideasData.title} />}
      <div className={styles.tabWrapper}>
        <ButtonTabs
          defaultValue={tabsIdeas[0].id}
          tabs={tabsIdeas}
          scrollable
          onChangeTab={(event, tab) => onChangeTab(tab.id)}
          className={styles.buttonTabs}
        />
      </div>

      <Container>
        <div className={styles.grid}>
          {filteredTabsIdeas.slice(0, MAX_COUNT_IMAGE).map((img) => {
            return (
              <div key={img.id} className={styles.imageItem}>
                <IdeasPopup
                  productData={selectedProduct?.product || {}}
                  visible={selectedProduct.imgId === img.id}
                  onClose={() => setSelectedProduct((prevState) => ({ ...prevState, imgId: -1 }))}
                />
                <div className={cn(styles.imageWrapper, 'imageInner')}>
                  <div className={styles.imageInner}>
                    <img src={img.src} alt='' />
                    {img.products.map((product, index) => {
                      return (
                        <div
                          onClick={() => {
                            setSelectedProduct({ imgId: img.id, product });
                          }}
                          className={styles.pinWrapper}
                          key={index}
                          style={{ top: `${product.coords[0]}%`, left: `${product.coords[1]}%` }}
                        >
                          <div className={styles.pin} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filteredTabsIdeas.length > MAX_COUNT_IMAGE && (
          <Link to='' className={styles.buttonMore}>
            <Button theme='blank'>Показать еще идеи</Button>
          </Link>
        )}
      </Container>
    </div>
  );
};

export default memo(Ideas);
