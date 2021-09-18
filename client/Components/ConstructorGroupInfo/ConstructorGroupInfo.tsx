import { HTMLAttributes, FC } from 'react';
import cn from 'classnames';

import ConstructorTag from '@Components/ConstructorTag';
import { ConstructorAdditional, ConstructorTagData } from '@Types/Constructor';
import styles from './ConstructorGroupInfo.module.css';

export interface ConstructorGroupInfoProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  view?: 'white' | 'gray';
  tags: ConstructorTagData[];
  description?: string;
  additional: ConstructorAdditional[];
}

const ConstructorGroupInfo: FC<ConstructorGroupInfoProps> = (props) => {
  const { className, view, tags, description, additional, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.constructorGroupInfo, [className])}>
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <ConstructorTag
              className={styles.tag}
              key={index}
              expanded
              size='m'
              icon={tag.icon}
              title={tag.title}
              view={view}
            />
          ))}
        </div>
      )}

      <div className={styles.text}>{description}</div>
      <div className={styles.params}>
        {additional.map((item) => (
          <div className={styles.param} key={item.id}>
            <span className={styles.paramName}>{`${item.name}: `}</span>
            <span className={styles.paramValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstructorGroupInfo;
