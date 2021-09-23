import React from 'react';
import MinusIcon from '@Pages/PageSleeper/elems/Questions/QuetionCard/MinusIcon';
import PlusIcon from '@Pages/PageSleeper/elems/Questions/QuetionCard/PlusIcon';
import cn from 'classnames';
import styles from './QuetionCard.module.css';

interface QuestionCardInterface {
  title: string;
  content: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardInterface> = ({
  content,
  title,
  active,
  onClick,
  className,
}) => {
  return (
    <div className={cn(styles.wrapper, className)} onClick={onClick}>
      <div className={styles.titleWrapper}>
        {active ? <MinusIcon className={styles.icon} /> : <PlusIcon className={styles.icon} />}
        <div className={styles.title}>{title}</div>
      </div>

      {active && <div className={styles.content}>{content}</div>}
    </div>
  );
};

export default React.memo(QuestionCard);
