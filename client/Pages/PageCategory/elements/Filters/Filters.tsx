import { FC, HTMLAttributes, MouseEvent, useMemo, useCallback, useState, memo, lazy } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Link from '@UI/Link';
import useMedias from '@Hooks/useMedias';
import useModals from '@Hooks/useModals';
import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import { GroupData } from '@Pages/PageCategory/typings';
import Dropdown from '../Dropdown';
import styles from './Filters.module.css';

export interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  count?: number;
  groups?: GroupData[];
  isMatrasyCategory?: boolean;
  onOpen?: (e: MouseEvent, id: string) => void;
  onChangeSort?: (e: MouseEvent) => void;
}

const GroupsPopup = lazy(() => import('../GroupsPopup'));
const OptionsPopup = lazy(() => import('../OptionsPopup'));

const Filters: FC<FiltersProps> = (props) => {
  const { className, count, groups, isMatrasyCategory, onOpen, onChangeSort, ...restProps } = props;
  const [openedGroups, setOpenedGroups] = useState(false);
  const [openedOptions, setOpenedOptions] = useState(false);
  const filtrator = useFiltrator();
  const { isMobile } = useMedias();
  const [, { openModal }] = useModals();

  const labelSort = useMemo(() => {
    const { name } = filtrator.sort.find((item) => item.selected);

    return `${name.substr(0, 1).toUpperCase()}${name.substr(1)}`;
  }, [filtrator.sort]);

  const secondaryFilters = useMemo(() => {
    return (filtrator.filters || []).slice(0, 3);
  }, [filtrator.filters]);

  const handleOpen = useCallback(
    (e, id) => {
      if (onOpen) onOpen(e, id);
    },
    [onOpen],
  );

  const handleChangeSort = useCallback(
    (e: MouseEvent, option: typeof filtrator.sort[0]) => {
      Filtrator.setSort(option);

      if (onChangeSort) onChangeSort(e);
    },
    [filtrator, onChangeSort],
  );

  const handleOpenGroups = useCallback(() => {
    if (!isMobile) return;

    setOpenedGroups(true);
    openModal('MobileGroups', {
      label: 'По группам',
      groups,
      onClose: () => setOpenedGroups(false),
    });
  }, [groups, isMobile, openModal]);

  const handleOpenOptions = useCallback(() => {
    if (!isMobile) return;

    setOpenedOptions(true);
    openModal('MobileOptions', {
      label: labelSort,
      options: filtrator.sort,
      onClose: () => setOpenedOptions(false),
      onCheckOption: handleChangeSort,
    });
  }, [filtrator.sort, handleChangeSort, isMobile, labelSort, openModal]);

  return (
    <div {...restProps} className={cn(styles.filters, className)}>
      <div className={styles.actions}>
        {filtrator.filters && (
          <div className={styles.buttons}>
            <Button
              className={cn(styles.button, styles.main)}
              view='rounded'
              before={<div className={styles.iconFilters} />}
              onClick={(e) => handleOpen(e, 'all')}
            >
              Все фильтры
            </Button>

            {secondaryFilters.map((filter) => (
              <Button
                className={cn(styles.button, styles.secondary)}
                view='rounded'
                theme='blank'
                key={filter.name}
                onClick={(e) => handleOpen(e, filter.name)}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        )}

        {typeof count === 'number' && <div className={styles.count}>{`Найдено ${count}`}</div>}
      </div>

      <div className={styles.wrapperLabels}>
        {isMatrasyCategory && (
          <Link
            className={styles.buttonMattresses}
            to='/promo/mattrasses'
            target='_blank'
            view='native'
          >
            <Button wide theme='secondary'>
              <div className={styles.iconMattresses} />
              Подобрать матрас
            </Button>
          </Link>
        )}

        <div className={styles.labels}>
          <Dropdown
            className={styles.label}
            label='По группам'
            opened={openedGroups}
            onOpen={handleOpenGroups}
          >
            {!isMobile && <GroupsPopup label='По группам' groups={groups} />}
          </Dropdown>

          <Dropdown
            className={styles.label}
            label={labelSort}
            opened={openedOptions}
            onOpen={handleOpenOptions}
          >
            {!isMobile && (
              <OptionsPopup
                label={labelSort}
                options={filtrator.sort}
                onCheckOption={handleChangeSort}
              />
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default memo(Filters);
