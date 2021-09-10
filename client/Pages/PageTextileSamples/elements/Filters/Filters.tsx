import React, {
  FC,
  HTMLAttributes,
  MouseEvent,
  useMemo,
  useCallback,
  useState,
  memo,
  lazy,
} from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
// import Link from '@UI/Link';
// import useMedias from '@Hooks/useMedias';
// import useModals from '@Hooks/useModals';
import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import { GroupData } from '@Pages/PageCategory/typings';
// import Dropdown from '../Dropdown';
import styles from './Filters.module.css';

export interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  count?: number;
  groups?: GroupData[];
  isMatrasyCategory?: boolean;
  onOpen?: (e: MouseEvent, id: string) => void;
  onChangeSort?: (e: MouseEvent) => void;
}

// const GroupsPopup = lazy(() => import('../GroupsPopup'));
// const OptionsPopup = lazy(() => import('../OptionsPopup'));

const Filters: FC<FiltersProps> = (props) => {
  const { className, count, groups, isMatrasyCategory, onOpen, onChangeSort, ...restProps } = props;
  // const [openedGroups, setOpenedGroups] = useState(false);
  // const [openedOptions, setOpenedOptions] = useState(false);
  const filtrator = useFiltrator();
  // const { isMobile } = useMedias();
  // const [, { openModal }] = useModals();

  // const labelSort = useMemo(() => {
  //   const { name } = filtrator.sort.find((item) => item.selected);

  //   return `${name.substr(0, 1).toUpperCase()}${name.substr(1)}`;
  // }, [filtrator.sort]);

  const secondaryFilters = useMemo(() => {
    return filtrator.filters.slice(0, 3);
  }, [filtrator.filters]);

  const handleOpen = useCallback(
    (e, id) => {
      if (onOpen) onOpen(e, id);
    },
    [onOpen],
  );

  const otfiltronino = useMemo(() => {
    const cvetaId = filtrator.selected.parameters[40]?.default || [];
    const resColors = cvetaId.map((cvetId) => {
      const res = filtrator.selected.parameterValues.find(
        (param) => param.parameterId === '40' && param.value[0] === cvetId,
      );
      return res.name;
    });

    const tagsId = filtrator.selected.parameters[10]?.default || [];
    const resTags = tagsId.map((tagId) => {
      const res = filtrator.selected.parameterValues.find(
        (param) => param.parameterId === '10' && param.value[0] === tagId,
      );
      return res.name;
    });

    const collections = filtrator.selected.parameters[20]?.default || [];
    const resCollections = collections.map((collectionId) => {
      const res = filtrator.selected.parameterValues.find(
        (param) => param.parameterId === '20' && param.value[0] === collectionId,
      );
      return res.name;
    });

    const resultArray = [...resCollections, ...resColors, ...resTags];

    return resultArray.join(' x ');
  }, [filtrator.selected.parameterValues, filtrator.selected.parameters]);

  // const handleChangeSort = useCallback(
  //   (e: MouseEvent, option: typeof filtrator.sort[0]) => {
  //     Filtrator.setSort(option);

  //     if (onChangeSort) onChangeSort(e);
  //   },
  //   [filtrator, onChangeSort],
  // );

  // const handleOpenGroups = useCallback(() => {
  //   if (!isMobile) return;

  //   setOpenedGroups(true);
  //   openModal('MobileGroups', {
  //     label: 'По группам',
  //     groups,
  //     onClose: () => setOpenedGroups(false),
  //   });
  // }, [groups, isMobile, openModal]);

  // const handleOpenOptions = useCallback(() => {
  //   if (!isMobile) return;

  //   setOpenedOptions(true);
  //   openModal('MobileOptions', {
  //     label: labelSort,
  //     options: filtrator.sort,
  //     onClose: () => setOpenedOptions(false),
  //   });
  // }, [filtrator.sort, isMobile, labelSort, openModal]);

  return (
    <div {...restProps} className={cn(styles.filters, className)}>
      <div className={styles.actions}>
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

        {/* {typeof count === 'number' && <div className={styles.count}>{`Найдено ${count}`}</div>} */}
      </div>

      <div className={styles.wrapperLabels}>
        {/* {isMatrasyCategory && (
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
        )} */}

        {/* <div className={styles.labels}>
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
        </div> */}
      </div>
      <div>{otfiltronino}</div>
    </div>
  );
};

export default memo(Filters);
