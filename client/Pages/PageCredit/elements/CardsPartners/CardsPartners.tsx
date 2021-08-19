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

const CardsPartners: FC<CardsPartnersProps> = (props) => {
  const { className, partners, ...restProps } = props;
  const { isMobile } = useMedias();
  const [selectedTab, setSelectedTab] = useState(partners[0].id);

  const tabs = useMemo(() => {
    return partners.map((partner) => ({ id: partner.id, label: partner.name }));
  }, [partners]);

  const selectedPartner = useMemo(() => {
    return partners.find((partner) => partner.id === selectedTab);
  }, [partners, selectedTab]);

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
