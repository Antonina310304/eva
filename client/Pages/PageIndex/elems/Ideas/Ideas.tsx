import React, { FC, HTMLAttributes, useMemo } from 'react';
import cn from 'classnames';
import Button from '@UI/Button';
import ButtonTabs, { ButtonTabsProps } from '@UI/ButtonTabs';
import IdeasPopup from '@Pages/PageIndex/elems/Ideas/IdeasPopup/IdeasPopup';
import Link from '@UI/Link';
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
  const [popupVisible, setPopupVisible] = React.useState(-1);
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
    (index: number) => {
      setClickedProduct(filteredProducts[index]);
      setPopupVisible(index);
    },
    [filteredProducts],
  );

  return (
    <div className={cn(className, styles.wrapper)}>
      <h2 className={styles.title}>{title || 'Идеи для дома'}</h2>

      <ButtonTabs
        {...tabGroup}
        onChangeTab={(event, tab) => setSelectedTab(tab.id)}
        className={styles.buttonTabs}
      />
      <div className={styles.imageBlock}>
        {filteredProducts[0] && (
          <div className={styles.imageWrapper}>
            <img
              className={cn(styles.imageCard_first)}
              src={filteredProducts[0].imageUrl}
              onClick={(event) => handleImageClick(0)}
            />
            {popupVisible === 0 && (
              <IdeasPopup
                ref={popupRef}
                productData={clickedProduct}
                visible={popupVisible === 0}
                onClose={() => setPopupVisible(-1)}
              />
            )}
          </div>
        )}
        <div className={styles.imageBlock_subWrapper}>
          <div className={styles.leftBlock}>
            {filteredProducts[1] && (
              <div className={styles.imageWrapper}>
                <img
                  className={cn(styles.imageCard_vertical, styles.imageCard_bottomMargin)}
                  src={filteredProducts[1].imageUrl}
                  onClick={(event) => handleImageClick(1)}
                />
                {popupVisible === 1 && (
                  <IdeasPopup
                    ref={popupRef}
                    productData={clickedProduct}
                    visible={popupVisible === 1}
                    onClose={() => setPopupVisible(-1)}
                  />
                )}
              </div>
            )}
            {filteredProducts[2] && (
              <div className={styles.imageWrapper}>
                <img
                  className={cn(styles.imageCard_horizontal)}
                  src={filteredProducts[2].imageUrl}
                  onClick={(event) => handleImageClick(2)}
                />
                {popupVisible === 2 && (
                  <IdeasPopup
                    ref={popupRef}
                    productData={clickedProduct}
                    visible={popupVisible === 2}
                    onClose={() => setPopupVisible(-1)}
                  />
                )}
              </div>
            )}
          </div>
          <div className={styles.rightBlock}>
            {filteredProducts[3] && (
              <div className={styles.imageWrapper}>
                <img
                  className={cn(styles.imageCard_horizontal, styles.imageCard_bottomMargin)}
                  src={filteredProducts[3].imageUrl}
                  onClick={(event) => handleImageClick(3)}
                />
                {popupVisible === 3 && (
                  <IdeasPopup
                    ref={popupRef}
                    productData={clickedProduct}
                    visible={popupVisible === 3}
                    onClose={() => setPopupVisible(-1)}
                  />
                )}
              </div>
            )}
            {filteredProducts[4] && (
              <div className={styles.imageWrapper}>
                <img
                  className={cn(styles.imageCard_vertical)}
                  src={filteredProducts[4].imageUrl}
                  onClick={(event) => handleImageClick(4)}
                />
                {popupVisible === 4 && (
                  <IdeasPopup
                    ref={popupRef}
                    productData={clickedProduct}
                    visible={popupVisible === 4}
                    onClose={() => setPopupVisible(-1)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Link to='' className={styles.buttonMore}>
        <Button theme='blank'>Показать еще идеи</Button>
      </Link>
    </div>
  );
};

export default React.memo(Ideas);
