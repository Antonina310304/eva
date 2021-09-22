import React from 'react';
import StepLogo from '@Pages/PageSleeper/elems/CaseAndPackaging/Step/StepLogo';
import cn from 'classnames';
import styles from './Step.module.css';

interface StepProps {
  className?: string;
  number: number;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, description, className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <StepLogo />
      <div className={styles.textWrapper}>
        <div className={styles.stepNumber}>{`Шаг ${number}`}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default React.memo(Step);
