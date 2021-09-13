import React, { forwardRef, HTMLAttributes } from 'react';
import Popup from '@UI/Popup/Popup';
import IconClose from '@UI/IconClose/IconClose';
import Discount from '@UI/Discount';
import Link from '@UI/Link';
import Like from '@Components/Like';
import { ProductData } from '@Types/Product';
import styles from './IdeasPopup.module.css';

interface IdeasPopupInterface {
  visible: boolean;
  onClose: () => void;
  productData: Partial<ProductData>;
}

const IdeasPopup = forwardRef<HTMLDivElement, IdeasPopupInterface>(
  ({ visible, onClose, productData }, ref) => {
    return (
      <Popup className={styles.popup} visible={visible} ref={ref}>
        <div className={styles.container}>
          <IconClose className={styles.iconClose} view='default' size='m' onClick={onClose} />
          <div className={styles.content}>
            <div className={styles.imageBlock}>
              <Like className={styles.like} />
              <img className={styles.image} src={productData.images[0].src} />
              <div className={styles.iconContainer}>
                {productData.tags.map((tag) => (
                  <img src={tag.image.src} className={styles.iconWrapper} />
                ))}
              </div>
            </div>

            <div className={styles.title}>{productData.name}</div>
            <div>
              <span className={styles.price_title}>Цена</span>
              <span className={styles.totalPrice}>{productData.price.actual}</span>
              {productData.price.expired && (
                <span className={styles.price}>{productData.price.expired}</span>
              )}
              {productData.price.discount && (
                <Discount className={styles.discount}>{productData.price.discount}</Discount>
              )}
            </div>
            {productData.link && (
              <div className={styles.details}>
                <Link to={productData.link}>Подробнее</Link>
              </div>
            )}
          </div>
        </div>
      </Popup>
    );
  },
);

export default IdeasPopup;
