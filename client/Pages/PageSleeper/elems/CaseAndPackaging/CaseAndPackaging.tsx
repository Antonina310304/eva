import React, { FC, memo } from 'react';
import cn from 'classnames';
import Step from './Step';
import NarrowContainer from '../NarrowContainer';
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
    <div className={cn(className, styles.wrapper, 'wrapper')}>
      <div className={styles.bgWrapper}>
        {/* сюда вместо img нужно будет перенести canvas с анимацией со старого сайта */}
        <img src={bckUrl} alt='' className={styles.bg} />
      </div>
      <NarrowContainer>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.description}>{description}</div>
          <div className={styles.stepsWrapper}>
            {steps.map((step, index) => (
              <Step key={index} number={index + 1} description={step} />
            ))}
          </div>
        </div>
      </NarrowContainer>
    </div>
  );
};

export default memo(CaseAndPackaging);
