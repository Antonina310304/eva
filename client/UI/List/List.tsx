import { cloneElement, createElement, memo, ReactElement } from 'react';

export interface Props<T> {
  className?: string;
  tagName?: string;
  items: T[];
  renderChild: (item: T, index: number) => ReactElement;
}

export type Item = any;

const List = <T extends Item>(props: Props<T>) => {
  const { className, tagName = 'div', items, renderChild, ...restProps } = props;

  return createElement(tagName, {
    ...restProps,
    className,
    children: items.map((item: Item, index) => {
      const child = renderChild(item, index);

      return child && cloneElement(child, { key: item.id || index });
    }),
  });
};

export default memo(List);
