import React, { FC, HTMLAttributes, Fragment, memo, useCallback } from 'react';
import cn from 'classnames';

import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import InputsRange from '@UI/InputsRange';
import CheckboxList, { CheckboxItemData } from '@UI/CheckboxList';
import Group from '../Group';
import GroupItem from '../GroupItem';
import styles from './Content.module.css';

export interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const formatName = (name: string) => name.replace(/ /g, '');

const Content: FC<ContentProps> = (props) => {
  const { className, ...restProps } = props;
  const filtrator = useFiltrator();

  const handleChangeRange = useCallback((_e, params) => {
    const from = params.type === 'min' ? params.value : null;
    const to = params.type === 'max' ? params.value : null;
    const opts = { id: params.parameterId, from, to };

    Filtrator.changeRange(opts);
  }, []);

  const handleToggleCheckbox = useCallback((_e, item: CheckboxItemData) => {
    const opts = { id: item.data.parameterId, value: item.data.value[0] };

    if (item.checked) {
      Filtrator.removeCheckbox(opts);
    } else {
      Filtrator.addCheckbox(opts);
    }
  }, []);

  return (
    <div {...restProps} className={cn(styles.content, className)}>
      {filtrator.filters.map((filter, indexFilter) => (
        <Group
          className={styles.group}
          title={filter.name}
          key={indexFilter}
          id={formatName(filter.name)}
        >
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
  );
};

export default memo(Content);
