import { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Button from '@UI/Button';
import useModals from '@Hooks/useModals';
import styles from './PromoCard.module.css';

export interface PromoCardData {
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

export interface PromoCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  card: PromoCardData;
}

const PromoCard: FC<PromoCardProps> = (props) => {
  const { className, card, ...restProps } = props;
  const isService = card.type === 'service';
  const [, { openModal }] = useModals();

  const handleBtnClick = useCallback(() => {
    switch (card.buttonEvent) {
      case 'sampleOrder':
        openModal('Info', {
          title: 'Упс!',
          text: 'Ещё не готово, заходите позже…',
        });
        break;

      case 'videoConsultation':
        openModal('Info', {
          title: 'Упс!',
          text: 'Ещё не готово, заходите позже…',
        });
        break;

      default:
    }
  }, [card.buttonEvent, openModal]);

  return (
    <div
      {...restProps}
      className={styles.cardWrapper}
      style={card.bgColor ? { backgroundColor: card.bgColor } : undefined}
    >
      <div className={styles.card}>
        {!isService && <Image src={card.bgImage} className={styles.bgImage} />}

        {card.period && !isService && (
          <div
            className={cn(styles.period, { [styles.lightText]: card.theme === 'dark' })}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: card.period }} // чтобы можно было вставлять текст с неразрывными пробелами
          />
        )}

        {isService && (
          <div className={cn(styles.imageServiceWrapper, 'serviceImg')}>
            <img className={styles.imageService} src={card.bgImage} alt='' />
          </div>
        )}

        <div className={cn(styles.title, { [styles.lightText]: card.theme === 'dark' })}>
          {card.title}
        </div>

        {card.description && (
          <div
            className={cn(styles.description, { [styles.lightText]: card.theme === 'dark' })}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: card.description }} // чтобы можно было вставлять текст с неразрывными пробелами
          />
        )}

        {card.discount && <div className={styles.discount}>{card.discount}</div>}

        {card.buttonText && (
          <div className={styles.serviceBtnWrapper}>
            <Button theme='blank' wide onClick={handleBtnClick}>
              {card.buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PromoCard);
