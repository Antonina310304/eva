import { FC, memo } from 'react';

import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import Image from '@UI/Image';
import List from '@UI/List';
import Scroller from '@UI/Scroller';
import { PublicationData } from '@Types/Press';
import styles from './PublicationDetails.module.css';

export interface PublicationDetailsProps {
  className?: string;
  publication: PublicationData;
}

const PublicationDetails: FC<PublicationDetailsProps> = (props) => {
  const { className, publication, ...restProps } = props;
  const { isMobileM, isDesktopM } = useMedias();

  return (
    <div {...restProps} className={cn(styles.publicationDetails, [className])}>
      {!isDesktopM && <Image src={publication.gallery[0].src} className={styles.mainPhoto} />}
      <Scroller className={styles.scroller} invisible={isMobileM}>
        <div className={styles.containerContent}>
          <div className={styles.medias}>
            {isDesktopM && <Image src={publication.gallery[0].src} className={styles.mainPhoto} />}
            <div className={styles.source}>
              <div className={styles.sourceImage}>
                <Image src={publication.image} className={styles.sourcePreview} />
              </div>
              <div className={styles.sourceInfo}>
                <div className={styles.sourceName}>{publication.name}</div>
                <div className={styles.sourceDate}>{publication.date}</div>
              </div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.title}>{publication.title}</div>
            <List
              className={styles.texts}
              items={publication.text}
              renderChild={(item: string) => <div className={styles.textItem}>{item}</div>}
            />
          </div>
        </div>
      </Scroller>
    </div>
  );
};

export default memo(PublicationDetails);
