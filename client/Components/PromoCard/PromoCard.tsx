import React, { FC, memo } from 'react';
import cn from 'classnames';
import Image from '@UI/Image';
import Button from '@UI/Button';

import styles from './PromoCard.module.css';

export interface PromoCardProps {
  type: 'event' | 'service';
  title: string;
  description?: string;
  period?: string;
  bgImage: string;
  bgColor?: string;
  discount?: string;
  theme?: 'light' | 'dark';
  buttonText?: string;
  buttonEvent?: 'sampleOrder' | 'videoConsultation';
}

const PromoCard: FC<PromoCardProps> = ({
  type,
  title,
  description,
  period,
  bgImage,
  bgColor,
  discount,
  theme = 'light',
  buttonText,
  buttonEvent,
}) => {
  const cardInlineStyles = bgColor ? { backgroundColor: bgColor } : {};
  const isService = type === 'service';

  const orderSample = () => {
    // eslint-disable-next-line no-console
    console.log('Заказать образцы тканей');
  };

  const orderVideoConsultation = () => {
    // eslint-disable-next-line no-console
    console.log('Заказать видеоконсультацию со специалистом');
  };

  const handleBtnClick = buttonEvent === 'sampleOrder' ? orderSample : orderVideoConsultation;

  return (
    <div className={styles.cardWrapper} style={cardInlineStyles}>
      <div className={styles.card}>
        {!isService && <Image src={bgImage} className={styles.bgImage} />}
        {!!period && !isService && (
          <div
            className={cn(styles.period, { [styles.lightText]: theme === 'dark' })}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: period }} // чтобы можно было вставлять текст с неразрывными пробелами
          />
        )}
        {isService && (
          <div className={cn(styles.imageServiceWrapper, 'serviceImg')}>
            <img className={styles.imageService} src={bgImage} alt='' />
          </div>
        )}
        <div className={cn(styles.title, { [styles.lightText]: theme === 'dark' })}>{title}</div>
        {!!description && (
          <div
            className={cn(styles.description, { [styles.lightText]: theme === 'dark' })}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: description }} // чтобы можно было вставлять текст с неразрывными пробелами
          />
        )}
        {!!discount && <div className={styles.discount}>{discount}</div>}
        {!!buttonText && (
          <div className={styles.serviceBtnWrapper}>
            <Button theme='blank' wide onClick={handleBtnClick}>
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PromoCard);
