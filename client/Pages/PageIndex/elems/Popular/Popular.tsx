import React, { cloneElement, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import SectionTitle from '@Components/SectionTitle';
import Container from '@Components/Container';
import PopularCard from '@Pages/PageIndex/elems/PopularCard/PopularCard';
import CrossSaleSection from '@Components/CrossSaleSection/CrossSaleSection';
import CrossSaleProductCard from '@Components/CrossSaleProductCard/CrossSaleProductCard';
import Gallery from '@UI/Gallery';
import styles from './Popular.module.css';

export interface PopularProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  data: { title: string; products: any };
}
const Popular: FC<PopularProps> = ({ className, data }) => {
  const productsGroup = [];
  new Array(Math.ceil(data.products.length / 3)).fill('').forEach((item, index) => {
    const newArray = data.products.slice(index * 3, (index + 1) * 3);

    if (typeof productsGroup[Math.floor(index / 2)] === 'undefined') {
      productsGroup[Math.floor(index / 2)] = [];
    }
    productsGroup[Math.floor(index / 2)].push(newArray);
  });

  function gallery() {
    /* это слайды */
    return productsGroup.map((group, gInd) => {
      // это 2 блока внутри слайдра
      return (
        <div className={styles.cardGroup} key={gInd}>
          {group.map((item, index) => {
            // это 3 карточки товара
            return (
              <div className={styles.item} key={index}>
                {item.map((i, ind) => {
                  return (
                    <div className={styles.card} key={ind}>
                      <PopularCard title={i.title} img={i.img} count={i.count} badge={i.badge} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <div className={cn(className, styles.wrapper)}>
      <Container>
        <SectionTitle title={data.title} className={styles.title} />
      </Container>

      <div className={styles.galleryWrapper}>
        <Container>
          <Gallery
            className={styles.gallery}
            slideIndex={0}
            key={productsGroup.length}
            onChangeCurrent={() => true}
            onChangeProgress={() => true}
          >
            {gallery()}
          </Gallery>
        </Container>
      </div>
    </div>
  );
};

export default Popular;
