import React, { forwardRef, HTMLAttributes } from 'react';
import Popup from '@UI/Popup/Popup';
import IconClose from '@UI/IconClose/IconClose';
import Discount from '@UI/Discount';
import Link from '@UI/Link';
import Like from '@Components/Like';
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
  left: string;
  top: string;
}

const IdeasPopup = forwardRef<HTMLDivElement, IdeasPopupInterface>(
  ({ visible, onClose, productData, left, top }, ref) => {
    return (
      <Popup visible={visible} style={{ top, left }} ref={ref}>
        <div className={styles.container}>
          <IconClose className={styles.iconClose} view='default' size='s' onClick={onClose} />
          <div className={styles.content}>
            <div className={styles.imageBlock}>
              <Like className={styles.like} />
              <img className={styles.image} src={productData.imageUrl} />
              <div className={styles.iconContainer}>
                {productData.icons.map((Icon) => (
                  <Icon className={styles.iconWrapper} />
                ))}
              </div>
            </div>

            <div className={styles.title}>{productData.title}</div>
            <div>
              <span className={styles.price_title}>Цена</span>
              <span className={styles.totalPrice}>{productData.totalPrice}</span>
              {productData.price && <span className={styles.price}>{productData.price}</span>}
              {productData.discount && (
                <Discount className={styles.discount}>{productData.discount}</Discount>
              )}
            </div>
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
