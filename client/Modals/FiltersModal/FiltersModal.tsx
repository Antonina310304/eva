import React, { memo, FC, Fragment, useCallback } from 'react';
import cn from 'classnames';

import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import Button from '@UI/Button';
import Link from '@UI/Link';
import InputsRange from '@UI/InputsRange';
import CheckboxList, { CheckboxItemData } from '@UI/CheckboxList';
import { useFiltrator } from '@Stores/filtrator';
import Group from './elements/Group';
import GroupItem from './elements/GroupItem';
import styles from './FiltersModal.module.css';

const FiltersModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const filtrator = useFiltrator();

  const handleChangeRange = useCallback(
    (_e, params) => {
      const from = params.type === 'min' ? params.value : null;
      const to = params.type === 'max' ? params.value : null;
      const opts = { id: params.parameterId, from, to };

      filtrator.changeRange(opts);
    },
    [filtrator],
  );

  const handleToggleCheckbox = useCallback(
    (_e, item: CheckboxItemData) => {
      const opts = { id: item.data.parameterId, value: item.data.value[0] };

      if (item.checked) {
        filtrator.removeCheckbox(opts);
      } else {
        filtrator.addCheckbox(opts);
      }
    },
    [filtrator],
  );

  return (
    <ModalSidebar
      {...restProps}
      className={cn(styles.FiltersModal, [className])}
      modal={modal}
      title='Фильтр'
      view='fullscreen'
      footer={
        <div className={styles.footer}>
          <Button className={styles.apply} wide>
            Применить
          </Button>
          <div className={styles.footerAdditional}>
            <div className={styles.count}>Найдено 154 модели</div>
            <Link className={styles.reset} to='#'>
              Сбросить фильтр
            </Link>
          </div>
        </div>
      }
    >
      <div className={styles.content}>
        {filtrator.filters.map((filter, indexFilter) => (
          <Group className={styles.group} title={filter.name} key={indexFilter}>
            {filter.items.map((item, indexItem) => {
              const parameter = filtrator.parameters[item.parameterId];
              const values = filtrator.parameterValues.filter((pv) => {
                return pv.parameterId === item.parameterId;
              });
              const [firstValue] = values;
              const title =
                filter.items.length > 1 ? `${parameter.name}, ${parameter.unit}` : undefined;

              return (
                <Fragment key={indexItem}>
                  {item.theme === 'range' && (
                    <GroupItem title={title}>
                      <InputsRange
                        min={+firstValue.value[0]}
                        max={+firstValue.value[1]}
                        valueMin={+parameter.default[0]}
                        valueMax={+parameter.default[1]}
                        onChange={(e, params) => {
                          return handleChangeRange(e, { parameterId: item.parameterId, ...params });
                        }}
                      />
                    </GroupItem>
                  )}

                  {item.theme === 'checkbox' && (
                    <CheckboxList
                      items={values.map((value) => ({
                        checked: parameter.default.includes(value.value[0]),
                        text: value.name,
                        color: value.meta.color,
                        data: value,
                      }))}
                      onToggle={handleToggleCheckbox}
                    />
                  )}
                </Fragment>
              );
            })}
          </Group>
        ))}
      </div>
    </ModalSidebar>
  );
};

export default memo(FiltersModal);
