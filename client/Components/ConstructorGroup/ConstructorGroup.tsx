import {
  useState,
  useMemo,
  memo,
  useCallback,
  HTMLAttributes,
  ReactElement,
  cloneElement,
  FC,
} from 'react';
import cn from 'classnames';

import Collapse from '@UI/Collapse';
import ConstructorGroupTitle from '@Components/ConstructorGroupTitle';
import ConstructorGroupInfo from '@Components/ConstructorGroupInfo';
import ConstructorTag from '@Components/ConstructorTag';
import { IConstructorGroup } from '@Types/Constructor';
import styles from './ConstructorGroup.module.css';

export interface ConstructorGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  isFirstCollection?: boolean;
  group: IConstructorGroup;
  slotCatalogItem: ReactElement;
  groupView?: 'modal' | 'fullDesktop' | 'mobileDesktop';
}

export interface View {
  collapsed: boolean;
  modal: boolean;
}

const ConstructorGroup: FC<ConstructorGroupProps> = (props) => {
  const {
    isFirstCollection,
    className,
    group,
    groupView = 'modal',
    slotCatalogItem,
    ...restProps
  } = props;
  const [visible, setVisible] = useState(false);

  const view = useMemo(() => {
    let result: View;
    if (groupView === 'fullDesktop') {
      result = { collapsed: false, modal: false };
    } else if (groupView === 'mobileDesktop') {
      result = { collapsed: true, modal: false };
    } else {
      result = { collapsed: true, modal: true };
    }
    return result;
  }, [groupView]);

  const hasDescription = group.description?.length > 0;

  const handleToggleVisibility = useCallback(
    (e) => {
      e.preventDefault();

      if (!hasDescription) return;

      setVisible((prev) => !prev);
    },
    [hasDescription],
  );

  return (
    <div
      {...restProps}
      className={cn(styles.constructorGroup, { [styles.visible]: visible }, className)}
    >
      <div className={styles.head}>
        <div className={styles.left}>
          <ConstructorGroupTitle
            view={view}
            active={hasDescription && group.extensive}
            onClick={handleToggleVisibility}
          >
            {group.title}
          </ConstructorGroupTitle>

          {group.tags && (
            <div
              className={cn(styles.tags, { [styles.visible]: !visible })}
              onClick={handleToggleVisibility}
            >
              {group.tags.map((tag, index) => (
                <ConstructorTag
                  key={index}
                  className={styles.tag}
                  size='s'
                  title={tag.title}
                  icon={tag.icon}
                />
              ))}
            </div>
          )}
        </div>

        {group.subtitle && (
          <div className={styles.right}>
            <div className={styles.desktopSubtitle}>
              <div>{group.subtitle}</div>
            </div>
          </div>
        )}
      </div>

      {group.subtitle && (
        <div className={styles.subhead}>
          <div className={styles.mobileSubtitle}>
            <div>{group.subtitle}</div>
          </div>
        </div>
      )}

      {hasDescription && group.extensive && (
        <Collapse collapsed={!visible && view.collapsed}>
          <div className={styles.info}>
            <ConstructorGroupInfo
              className={styles.infoContent}
              tags={group.tags}
              description={group.description}
              additional={group.additional}
            />
          </div>
        </Collapse>
      )}

      <div className={cn(styles.catalog, { [styles.desktopView]: !view.modal })}>
        {group.samples.map((sample, index) => {
          return cloneElement(slotCatalogItem, {
            key: index,
            sample,
            isFirstCollection,
            visible,
            modalView: view.modal,
          });
        })}
      </div>
    </div>
  );
};

export default memo(ConstructorGroup);
