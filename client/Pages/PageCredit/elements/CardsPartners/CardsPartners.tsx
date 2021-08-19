import React, { FC, HTMLAttributes, memo, useCallback, useState, useMemo } from 'react';
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

const tabs = [
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
];

const CardsPartners: FC<CardsPartnersProps> = (props) => {
  const { className, partners, ...restProps } = props;
  const { isMobile } = useMedias();

  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  const selectedPartner = useMemo(() => partners.find((partner) => partner.id === selectedTab), [
    partners,
    selectedTab,
  ]);

  const handleChangeTab = useCallback((_e, tab: Tab) => {
    setSelectedTab(tab.id);
  }, []);

  return (
    <div {...restProps} className={cn(styles.cardsPartners, className)}>
      <Wrapper>
        <ParagraphTitle title='Карты рассрочки' />

        <div className={styles.buttonTabsWrapper}>
          <ButtonTabs
            className={styles.buttonTabs}
            scrollable={isMobile}
            defaultValue={selectedTab}
            tabs={tabs}
            onChangeTab={handleChangeTab}
          />
        </div>
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
