import { FC, HTMLAttributes, memo, useCallback, useState, useMemo } from 'react';
import cn from 'classnames';

import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import useMedias from '@Hooks/useMedias';
import ServicePageParagraphTitle from '@Components/ServicePageParagraphTitle';
import ServicePageWrapper from '@Components/ServicePageWrapper';
import BankBanner from '../BankBanner';
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
      <ServicePageWrapper>
        <ServicePageParagraphTitle title='Карты рассрочки' />

        <div className={styles.buttonTabsWrapper}>
          <ButtonTabs
            className={styles.buttonTabs}
            scrollable={isMobile}
            defaultValue={selectedTab}
            tabs={tabs}
            onChangeTab={handleChangeTab}
          />
        </div>
      </ServicePageWrapper>

      <BankBanner className={styles.bankBanner} cardPartner={selectedPartner} />

      <ServicePageWrapper>
        <ListBlock
          className={styles.cardInfo}
          title={selectedPartner.title}
          list={selectedPartner.list}
        />
      </ServicePageWrapper>
    </div>
  );
};

export default memo(CardsPartners);
