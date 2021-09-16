import React, { FC, memo } from 'react';

import Link from '@UI/Link';
import InstagramSection, { InstagramSectionProps } from '@Components/InstagramSection';
import useMeta from '@Queries/useMeta';
import styles from './MainInstagramSection.module.css';

const accounts = {
  blr: {
    name: '@official_divan.by',
    link: 'https://www.instagram.com/official_divan.by/',
    hashtag: '#купилвдиванру',
  },
  rus: {
    name: '@official_divan.ru',
    link: 'https://www.instagram.com/official_divan.ru/',
    hashtag: '#купилвдиванру',
  },
};
const domains = {
  blr: 'Divan.by',
  rus: 'Divan.ru',
};

const MainInstagramSection: FC<InstagramSectionProps> = (props) => {
  const meta = useMeta();

  if (!meta.isSuccess) return null;

  const country = meta.data.country.toLowerCase();
  const account = accounts[country];
  const domain = domains[country];

  return (
    <InstagramSection
      hasPromoPlaceholder
      title={`Ищите вдохновение в инстаграм ${account.name}`}
      description={
        <div className={styles.instagramDescription}>
          {`Cтилизуете интерьер вместе с ${domain} – отмечайте `}
          <Link view='native' target='_blank' to={account.link}>
            {account.name}
          </Link>
          {` на фото в своем аккаунте Instagram,
                добавляйте хештег ${account.hashtag}. Мы публикуем лучшие кадры.`}
        </div>
      }
      {...props}
    />
  );
};

export default memo(MainInstagramSection);
