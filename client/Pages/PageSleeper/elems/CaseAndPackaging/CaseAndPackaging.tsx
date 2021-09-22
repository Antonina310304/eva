import React, { FC, memo } from 'react';
import cn from 'classnames';
import Step from '@Pages/PageSleeper/elems/CaseAndPackaging/Step';
import styles from './CaseAndPackaging.module.css';

const bckUrl = 'react/static/img/sleeper/caseAndPacking/bck.png';

const title = 'Чехол и упаковка';

const description =
  'Первое впечатление — самое важное, и мы позаботились о том, чтобы Sleeper понравился вам с одного взгляда. Особая технология скрутки позволила нам упаковать матрас в фирменную коробку — смотрится просто отлично!';

const steps = [
  'Достаньте матрас в скрученном виде из упаковки',
  'Разрежьте и аккуратно снимите упаковочную пленку',
  'Разложите матрас на горизонтальной поверхности',
  'Матрас полностью восстановит форму через 72 часа',
];

interface CaseAndPackagingProps {
  className?: string;
}

const CaseAndPackaging: FC<CaseAndPackagingProps> = ({ className }) => {
  return (
    <div
      className={cn(className, styles.wrapper)}
      style={{ background: `url(${bckUrl}) center center /cover` }}
    >
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.stepsWrapper}>
          {steps.map((step, index) => (
            <Step key={index} number={index + 1} description={step} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(CaseAndPackaging);
