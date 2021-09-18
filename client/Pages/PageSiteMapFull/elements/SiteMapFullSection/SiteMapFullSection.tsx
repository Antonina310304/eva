import { FC, memo, useCallback } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import Image from '@UI/Image';
import { CategoryProps, SubCategoryProps } from '../../typings';
import ListItem from './elements';
import styles from './SiteMapFullSection.module.css';

interface SiteMapFullSectionProps {
  className?: string;
  name: string;
  subcategories: CategoryProps[];
  parameters: SubCategoryProps[];
  types: SubCategoryProps[];
}

const SiteMapFullSection: FC<SiteMapFullSectionProps> = (props) => {
  const { className, name, subcategories, parameters, types, ...restProps } = props;
  const renderSubcategories = useCallback(() => {
    if (!subcategories || !subcategories.length) return null;

    return subcategories.map((subcategory, index) => (
      <li className={cn(styles.subcategory)} key={index}>
        <Link className={styles.link} to={subcategory.url}>
          <Image
            src={subcategory.icon}
            className={styles.subcategoryIcon}
            style={{ width: subcategory.width, height: subcategory.height }}
          />
          <div className={styles.subcategoryTitle}>{subcategory.title}</div>
        </Link>
      </li>
    ));
  }, [subcategories]);

  return (
    <section {...restProps} className={cn(styles.section, className)}>
      <div className={styles.topWrapper}>
        <div className={styles.container}>
          <h2 className={styles.title}>{name}</h2>
          <ul className={styles.list}>{renderSubcategories()}</ul>
        </div>
      </div>
      {(parameters.length > 0 || types.length > 0) && (
        <div className={styles.container}>
          {parameters.length > 0 && (
            <ul className={styles.listDetail}>
              {parameters.map((parameter, index) => (
                <ListItem
                  url={parameter.url}
                  title={parameter.title}
                  items={parameter.items}
                  key={index}
                />
              ))}
            </ul>
          )}
          {types.length > 0 && (
            <ul className={styles.listDetail}>
              {types.map((parameter, index) => (
                <ListItem
                  url={parameter.url}
                  title={parameter.title}
                  items={parameter.items}
                  key={index}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default memo(SiteMapFullSection);
