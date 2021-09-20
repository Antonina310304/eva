import { FC, HTMLAttributes, MouseEvent, memo } from 'react';
import cn from 'classnames';

import IconClose from '@UI/IconClose';
import Link from '@UI/Link';
import Scroller from '@UI/Scroller';
import Image from '@UI/Image';
import { SellPointData } from '@Types/SellPoints';
import styles from './PopupSelectedSellPoint.module.css';

export interface PopupSelectedSellPointProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  selectedPoint: SellPointData;
  onClose?: (e: MouseEvent) => void;
  onBack?: (e: MouseEvent) => void;
}

const PopupSelectedSellPoint: FC<PopupSelectedSellPointProps> = (props) => {
  const { className, onClose, onBack, selectedPoint, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.popupSelectedSellPoint, className)}>
      <div>
        <div className={styles.head}>
          <div className={styles.back} onClick={onBack}>
            <div className={styles.arrowBack} />
            <div className={styles.backText}>Назад</div>
          </div>
          <IconClose className={styles.iconClose} onClick={onClose} />
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
