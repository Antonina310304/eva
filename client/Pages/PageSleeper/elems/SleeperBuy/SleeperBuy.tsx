import React, { FC, memo } from 'react';
import Button from '@UI/Button';

import useMedias from '@Hooks/useMedias';
import NarrowContainer from '../NarrowContainer';
import styles from './SleeperBuy.module.css';

const title = 'Будущее здорового сна уже наступило';
const subTitle = 'Почувствуйте разницу!';
const description =
  'Эффективная система поддержки позвоночника, максимум комфорта и крепкий сон всю ночь. Все это Sleeper, и он идеален.';
const imgUrl = 'react/static/img/sleeper/sleeperBuy/img.png';

const SleeperBuy: FC = () => {
  const { isMobileM } = useMedias();

  const renderDesktop = () => {
    return (
      <>
        <div className={styles.textWrapper}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.subTitle}>{subTitle}</div>
          <div className={styles.description}>{description}</div>
          <Button theme='primary' className={styles.button}>
            Купить матрас
          </Button>
        </div>

        <img className={styles.img} src={imgUrl} alt='' />
      </>
    );
  };

  const renderMobile = () => {
    return (
      <>
        <h2 className={styles.title}>{title}</h2>

        <img className={styles.img} src={imgUrl} alt='' />

        <div className={styles.subTitle}>{subTitle}</div>
        <div className={styles.description}>{description}</div>
        <Button theme='primary' className={styles.button}>
          Купить матрас
        </Button>
      </>
    );
  };

  return (
    <>
      <div className={styles.wrapper}>
        <NarrowContainer>
          <div className={styles.content}>{isMobileM ? renderMobile() : renderDesktop()}</div>
        </NarrowContainer>
      </div>
      <div className={styles.breakLineWrapper}>
        <div className={styles.breakLine} />
      </div>
    </>
  );
};

export default memo(SleeperBuy);
