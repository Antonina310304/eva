import React, { FC, HTMLAttributes, memo, useCallback, useState, useMemo } from 'react';
import cn from 'classnames';

import Gallery from '@UI/Gallery';
import useMedias from '@Hooks/useMedias';
import Wrapper from '../Wrapper';
import BankBanner from '../BankBanner';
import ParagraphTitle from '../ParagraphTitle';
import ListBlock from '../ListBlock';
import styles from './CardsPartners.module.css';

export interface CardsPartnersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
}

const CardsPartners: FC<CardsPartnersProps> = (props) => {
  const { className, partners, ...restProps } = props;
  const { isMobile } = useMedias();
  const [slideIndex, setSlideIndex] = useState(0);
  const [cardsPartners, setCardsPartners] = useState([
    {
      id: 'halva',
      name: 'Халва',
      selected: true,
    },
    {
      id: 'smart',
      name: 'Смарт карта',
      selected: false,
    },
    {
      id: 'cherepaha',
      name: 'Черепаха',
      selected: false,
    },
    {
      id: 'pokupok',
      name: 'Карта покупок',
      selected: false,
    },
    {
      id: 'fun',
      name: 'Карта FUN',
      selected: false,
    },
    {
      id: 'fun-platinum',
      name: 'FUN Platinum',
      selected: false,
    },
    {
      id: 'magnit',
      name: 'Магнит',
      selected: false,
    },
    {
      id: 'priorbank',
      name: 'Priorbank',
      selected: false,
    },
  ]);
  const selectedPartner = useMemo(() => partners[slideIndex], [partners, slideIndex]);

  const handleClickCard = useCallback(
    (index) => {
      // partners.find((partner) => partner.id === id);
      // const newSelectedCard = cardsPartners.map((card) => {
      //   const newCard = { ...card };
      //   newCard.selected = false;
      //   return newCard;
      // });
      const newSelectedCard = [...cardsPartners];
      newSelectedCard[slideIndex].selected = false;
      newSelectedCard[index].selected = true;
      setCardsPartners(newSelectedCard);
      setSlideIndex(index);
    },
    [cardsPartners, slideIndex],
  );

  return (
    <div {...restProps} className={cn(styles.cardsPartners, className)}>
      <Wrapper>
        <ParagraphTitle title='Карты рассрочки' />

        {isMobile ? (
          <div className={styles.wrapperGallery}>
            <Gallery className={styles.gallery} slideIndex={slideIndex} centered>
              {cardsPartners.map((card, index) => (
                <div className={styles.item} key={card.id}>
                  <div
                    className={cn(styles.card, { [styles.selected]: card.selected })}
                    onClick={() => handleClickCard(index)}
                  >
                    {card.name}
                  </div>
                </div>
              ))}
            </Gallery>
          </div>
        ) : (
          <div className={styles.cardsWrapper}>
            {cardsPartners.map((card, index) => (
              <div className={styles.item} key={card.id}>
                <div
                  className={cn(styles.card, { [styles.selected]: card.selected })}
                  onClick={() => handleClickCard(index)}
                >
                  {card.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </Wrapper>

      <BankBanner cardPartner={selectedPartner} />

      <Wrapper>
        <ListBlock
          className={styles.cardInfo}
          title={selectedPartner.title}
          list={selectedPartner.list}
        />
      </Wrapper>
    </div>
  );
};

export default memo(CardsPartners);
