import Button from '@UI/Button';
import React, { FC, memo } from 'react';

import useMedias from '@Hooks/useMedias';
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
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.textWrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.subTitle}>{subTitle}</div>
            <div className={styles.description}>{description}</div>
            <Button theme='dirty' className={styles.button}>
              Купить матрас
            </Button>
          </div>

          <img className={styles.img} src={imgUrl} />
        </div>
      </div>
    );
  };

  const renderMobile = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>

          <img className={styles.img} src={imgUrl} />

          <div className={styles.subTitle}>{subTitle}</div>
          <div className={styles.description}>{description}</div>
          <Button theme='dirty' className={styles.button}>
            Купить матрас
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      {isMobileM ? renderMobile() : renderDesktop()}
      <div className={styles.breakLineWrapper}>
        <div className={styles.breakLine} />
      </div>
    </>
  );
};

export default memo(SleeperBuy);
