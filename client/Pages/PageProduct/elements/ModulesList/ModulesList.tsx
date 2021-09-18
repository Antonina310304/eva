import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ModuleCard from '@Components/ModuleCard';
import List from '@UI/List';
import { ModuleProductData } from '@Types/ModuleProduct';
import styles from './ModulesList.module.css';

export interface ModulesListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  modules?: ModuleProductData[];
}

const ModulesList: FC<ModulesListProps> = (props) => {
  const { className, modules, ...restProps } = props;

  return (
    <List
      {...restProps}
      className={cn(styles.modulesList, className)}
      items={modules}
      renderChild={(module: ModuleProductData) => (
        <div className={styles.item}>
          <ModuleCard className={styles.product} module={module} />
        </div>
      )}
    />
  );
};

export default memo(ModulesList);
