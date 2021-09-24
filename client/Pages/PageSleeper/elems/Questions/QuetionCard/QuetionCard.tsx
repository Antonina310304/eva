import React, { FC, memo, HTMLAttributes } from 'react';
import cn from 'classnames';
import MinusIcon from './MinusIcon';
import PlusIcon from './PlusIcon';
import styles from './QuetionCard.module.css';

interface QuestionCardInterface extends HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

const QuestionCard: FC<QuestionCardInterface> = ({
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

export default memo(QuestionCard);
