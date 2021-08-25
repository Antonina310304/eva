import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import IconClose from '@UI/IconClose';
import Link from '@UI/Link';
import Scroller from '@UI/Scroller';
import Image from '@UI/Image';
import { SellPointData } from '@Pages/PageContacts/typings';
import styles from './PopupSelectedSellPoint.module.css';

export interface PopupSelectedSellPointProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  selectedPoint: SellPointData;
  closePopup: () => void;
  goBack: () => void;
}

const PopupSelectedSellPoint: FC<PopupSelectedSellPointProps> = (props) => {
  const { className, closePopup, goBack, selectedPoint, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.popupSelectedSellPoint, className)}>
      <div>
        <div className={styles.head}>
          <div className={styles.back} onClick={goBack}>
            <div className={styles.arrowBack} />
            <div className={styles.backText}>Назад</div>
          </div>
          <IconClose className={styles.iconClose} onClick={closePopup} />
        </div>

        <Scroller className={styles.scrollerPoint}>
          <div className={styles.pointAddressWrapper}>
            <div
              className={styles.pointAddress}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: selectedPoint.address }}
            />
          </div>

          <div className={styles.telephone}>{selectedPoint.phone}</div>
          <div className={styles.workTime}>
            {`${selectedPoint.worktime[0]} ${selectedPoint.worktime[1]}`}
          </div>

          {selectedPoint.images.length > 0 && (
            <Image className={styles.image} src={selectedPoint.images[0]} />
          )}

          {selectedPoint.images.length > 1 && (
            <div className={styles.linkAllPhotosWrapper}>
              <Link
                view='secondary'
                className={styles.allPhotos}
                to={`/showroom#${selectedPoint.id}_gallery`}
              >
                Смотреть все фото
              </Link>
            </div>
          )}
        </Scroller>
      </div>
    </div>
  );
};

export default memo(PopupSelectedSellPoint);
