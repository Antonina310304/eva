import React, { FC, HTMLAttributes, memo, useCallback, useState, useRef } from 'react';
import cn from 'classnames';

import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import useMedias from '@Hooks/useMedias';
import Wrapper from '../Wrapper';
import BankBanner from '../BankBanner';
import ParagraphTitle from '../ParagraphTitle';
import ListBlock from '../ListBlock';
import { Partner } from '../../typings';
import styles from './CardsPartners.module.css';

export interface CardsPartnersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  partners: Partner[];
}

const CardsPartners: FC<CardsPartnersProps> = (props) => {
  const { className, partners, ...restProps } = props;
  const { isMobile } = useMedias();
  const cardsPartners = useRef([
    {
      id: 'halva',
      label: 'Халва',
    },
    {
      id: 'smart',
      label: 'Смарт карта',
    },
    {
      id: 'cherepaha',
      label: 'Черепаха',
    },
    {
      id: 'pokupok',
      label: 'Карта покупок',
    },
    {
      id: 'fun',
      label: 'Карта FUN',
    },
    {
      id: 'fun-platinum',
      label: 'FUN Platinum',
    },
    {
      id: 'magnit',
      label: 'Магнит',
    },
    {
      id: 'priorbank',
      label: 'Priorbank',
    },
  ]);
  const [selectedTab, setSelectedTab] = useState(cardsPartners.current[0].id);
  const [selectedPartner, setSelectedPartner] = useState(partners[0]);

  const handleChangeTab = useCallback(
    (_e, tab: Tab) => {
      setSelectedTab(tab.id);
      const partnerCard = partners.find((partner) => partner.id === tab.id);
      setSelectedPartner(partnerCard);
    },
    [partners],
  );

  return (
    <div {...restProps} className={cn(styles.cardsPartners, className)}>
      <Wrapper>
        <ParagraphTitle title='Карты рассрочки' />

        <ButtonTabs
          className={styles.buttonTabs}
          scrollable={isMobile}
          defaultValue={selectedTab}
          tabs={cardsPartners.current}
          onChangeTab={handleChangeTab}
        />
      </Wrapper>

      <BankBanner className={styles.bankBanner} cardPartner={selectedPartner} />

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
