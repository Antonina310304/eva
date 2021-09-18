import { forwardRef, memo, MouseEvent } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import IconClose from '@UI/IconClose';
import Discount from '@UI/Discount';
import Link from '@UI/Link';
import Image from '@UI/Image';
import Like from '@Components/Like';
import { ProductData } from '@Types/Product';
import styles from './IdeasPopup.module.css';

export interface IdeasPopupProps {
  className?: string;
  product: ProductData;
  onClose?: (e: MouseEvent) => void;
}

const IdeasPopup = forwardRef<HTMLDivElement, IdeasPopupProps>((props, ref) => {
  const { className, product, onClose } = props;
  const [firstImage] = product.images;

  return (
    <div className={cn(styles.container, className)} ref={ref}>
      <IconClose className={styles.iconClose} view='default' size='m' onClick={onClose} />
      <div className={styles.content}>
        <div className={styles.imageBlock}>
          <Like className={styles.like} />
          <Image className={styles.image} src={firstImage.src} />

          {product.tags?.length > 0 && (
            <div className={styles.tags}>
              {product.tags.map((tag, index) => (
                <img key={index} src={tag.image.src} className={styles.tag} />
              ))}
            </div>
          )}
        </div>

        <div className={styles.title}>{product?.name}</div>
        <div>
          <Price price={product?.price?.actual} className={styles.totalPrice} />
          {product?.price?.expired && (
            <Price expired price={product.price?.expired} className={styles.price} />
          )}
          {product?.price?.discount && (
            <Discount className={styles.discount}>{product?.price?.discount}</Discount>
          )}
        </div>

        {product.link && (
          <div className={styles.details}>
            <Link to={product.link}>Подробнее</Link>
          </div>
        )}
      </div>
    </div>
  );
});

export default memo(IdeasPopup);
