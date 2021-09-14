import React, { FC, memo } from 'react';
import Popup from '@UI/Popup/Popup';
import IconClose from '@UI/IconClose/IconClose';
import Discount from '@UI/Discount';
import Link from '@UI/Link';
import Like from '@Components/Like';

import Price from '@UI/Price';
import styles from './IdeasPopup.module.css';

interface IdeasPopupInterface {
  visible: boolean;
  onClose: () => void;
  productData: any;
}

const IdeasPopup: FC<IdeasPopupInterface> = ({ visible, onClose, productData }) => {
  return (
    <div className={styles.popupWrapper}>
      <Popup className={styles.popup} visible={visible}>
        <div className={styles.container}>
          <IconClose className={styles.iconClose} view='default' size='m' onClick={onClose} />
          <div className={styles.content}>
            <div className={styles.imageBlock}>
              <Like className={styles.like} />
              <div className={styles.imageWrapper}>
                <img className={styles.image} src={productData.src} />
              </div>
              <div className={styles.iconContainer}>
                {productData.tags.map((tag) => (
                  <img src={tag.image.src} className={styles.iconWrapper} />
                ))}
              </div>
            </div>

            <div className={styles.title}>{productData.name}</div>
            <div>
              <span className={styles.price_title}>Цена</span>
              <Price price={productData.price.actual} className={styles.totalPrice} />
              {productData.price.expired && (
                <Price expired price={productData.price.expired} className={styles.price} />
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
    </div>
  );
};
export default memo(IdeasPopup);
