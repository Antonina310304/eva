import React, { forwardRef, HTMLAttributes } from 'react';
import Popup from '@UI/Popup/Popup';
import IconClose from '@UI/IconClose/IconClose';
import Discount from '@UI/Discount';
import Link from '@UI/Link';
import Like from '@Components/Like';
import CrossSaleProductCard from '@Components/CrossSaleProductCard';
import { productCardMock } from '@Pages/PageIndex/elems/Ideas/IdeasMockProps';
import ProductCard from '@Components/ProductCard';
import styles from './IdeasPopup.module.css';

export interface IdeasPopupData {
  imageUrl: string;
  icons?: any[];
  title: string;
  price?: string; // цена без скидки
  totalPrice: string; // цена со скидкой, можно конечно считать и тут
  discount?: number;
  details?: string;
}

interface IdeasPopupInterface {
  visible: boolean;
  onClose: () => void;
  productData: IdeasPopupData;
}

const IdeasPopup = forwardRef<HTMLDivElement, IdeasPopupInterface>(
  ({ visible, onClose, productData }, ref) => {
    return (
      <Popup className={styles.popup} visible={visible} ref={ref}>
        <div className={styles.container}>
          <IconClose className={styles.iconClose} view='default' size='m' onClick={onClose} />
          <div className={styles.content}>
            {/* <CrossSaleProductCard product={productCardMock[0]} /> */}
            <ProductCard product={productCardMock[0]} />
            {productData.details && (
              <div className={styles.details}>
                <Link to={productData.details}>Подробнее</Link>
              </div>
            )}
          </div>
        </div>
      </Popup>
    );
  },
);

export default IdeasPopup;
