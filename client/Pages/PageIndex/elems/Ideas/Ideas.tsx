import React, { FC, HTMLAttributes, useCallback, useMemo } from 'react';
import cn from 'classnames';
import Button from '@UI/Button';
import ButtonTabs, { ButtonTabsProps } from '@UI/ButtonTabs';
import useModals from '@Hooks/useModals';
import Popup from '@UI/Popup';
import IdeasPopup from '@Pages/PageIndex/elems/Ideas/IdeasPopup/IdeasPopup';
import styles from './Ideas.module.css';

interface SomeProductInterface {
  imageUrl: string;
  type: string;
  totalPrice?: string;
  title?: string;
}

export interface IdeasProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  tabGroup: ButtonTabsProps;
  products: SomeProductInterface[];
}

const Ideas: FC<IdeasProps> = ({ className, title, tabGroup, products }) => {
  const [selectedTab, setSelectedTab] = React.useState('all');
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [clickedProduct, setClickedProduct] = React.useState(null);

  const popupRef = React.useRef<HTMLDivElement>();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (selectedTab === 'all') return products;

    return products.filter((product: SomeProductInterface) => {
      return product.type === selectedTab;
    });
  }, [products, selectedTab]);

  const handleImageClick = React.useCallback(
    (event: React.MouseEvent, product: SomeProductInterface) => {
      setClickedProduct(product);
      setPopupVisible(true);
    },
    [],
  );

  return (
    <div className={cn(className, styles.wrapper)}>
      <p className={styles.title}>{title || 'Идеи для дома'}</p>

      <ButtonTabs
        {...tabGroup}
        onChangeTab={(event, tab) => setSelectedTab(tab.id)}
        className={styles.buttonTabs}
      />
      <div className={styles.imageBlock}>
        {filteredProducts[0] && (
          <img
            className={cn(styles.imageCard_first)}
            src={filteredProducts[0].imageUrl}
            onClick={(event) => handleImageClick(event, filteredProducts[0])}
          />
        )}
        <div className={styles.imageBlock_subWrapper}>
          <div className={styles.leftBlock}>
            {filteredProducts[1] && (
              <img
                className={cn(styles.imageCard_horizontal, styles.imageCard_bottomMargin)}
                src={filteredProducts[1].imageUrl}
              />
            )}
            {filteredProducts[2] && (
              <img className={cn(styles.imageCard_vertical)} src={filteredProducts[2].imageUrl} />
            )}
          </div>
          <div className={styles.rightBlock}>
            {filteredProducts[3] && (
              <img
                className={cn(styles.imageCard_vertical, styles.imageCard_bottomMargin)}
                src={filteredProducts[3].imageUrl}
              />
            )}
            {filteredProducts[4] && (
              <img className={cn(styles.imageCard_horizontal)} src={filteredProducts[4].imageUrl} />
            )}
          </div>
        </div>

        {popupVisible && (
          <IdeasPopup
            ref={popupRef}
            productData={clickedProduct}
            visible={popupVisible}
            left='450px'
            top='250px'
            onClose={() => setPopupVisible(false)}
          />
        )}
      </div>

      <Button theme='blank' className={styles.buttonMore}>
        Показать еще идеи
      </Button>
    </div>
  );
};

export default React.memo(Ideas);
