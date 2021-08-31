import React, { FC, TextareaHTMLAttributes, memo, useState, useCallback } from 'react';
import cn from 'classnames';

import Collapse from '@UI/Collapse';
import Textarea from '@UI/Textarea';
import styles from './CommentField.module.css';

export interface CommentFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label: string;
}

const CommentField: FC<CommentFieldProps> = (props) => {
  const { className, label, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(true);

  const handleClickLabel = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <div className={cn(styles.field, { [styles.collapsed]: collapsed }, className)}>
      <div className={styles.wrapperLabel} onClick={handleClickLabel}>
        <span className={styles.label}>{label}</span>
        <div className={styles.iconArrow} />
      </div>

      <Collapse collapsed={collapsed}>
        <div className={styles.content}>
          <Textarea {...restProps} className={styles.textarea} />
        </div>
      </Collapse>
    </div>
  );
};

export default memo(CommentField);
