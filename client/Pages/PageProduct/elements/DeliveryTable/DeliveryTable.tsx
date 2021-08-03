import React, { FC, TableHTMLAttributes, memo, useMemo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import useMedias from '@Hooks/useMedias';
import styles from './DeliveryTable.module.css';

export interface ColumnData {
  title: string;
  content: string;
}

export interface DeliveryTableProps extends TableHTMLAttributes<HTMLTableElement> {
  className?: string;
}

const defaultColumns: ColumnData[] = [
  {
    title: 'В пределах МКАД < 10 км от МКАД',
    content: '1490 ₽',
  },
  {
    title: '1 - 39 км от МКАД',
    content: '30 ₽/км',
  },
  {
    title: '40 - 59 км от МКАД',
    content: '40 ₽/км',
  },
  {
    title: '> 60 км от МКАД',
    content: '50 ₽/км',
  },
  {
    title: 'Подъем на этажи на грузовом лифте',
    content: '500 ₽',
  },
  {
    title: 'Подъем на этажи ручной. Стоимость за 1 этаж',
    content: '500 ₽',
  },
];

const DeliveryTable: FC<DeliveryTableProps> = (props) => {
  const { className, ...restProps } = props;
  const { isMobile } = useMedias();

  if (isMobile) {
    const rows: ColumnData[][] = [];

    for (let i = 0; i < defaultColumns.length; i += 2) {
      rows.push(defaultColumns.slice(i, i + 2));
    }

    return (
      <List
        {...restProps}
        className={cn(styles.deliveryTable, className)}
        items={rows}
        renderChild={(row: ColumnData[]) => {
          const titles = [row[0].title, row[1].title];
          const contents = [row[0].content, row[1].content];

          return (
            <>
              <div className={styles.row}>
                {titles.map((title, index) => (
                  <div className={cn(styles.cell, styles.cellTitle)} key={index}>
                    {title}
                  </div>
                ))}
              </div>

              <div className={styles.row}>
                {contents.map((content, index) => (
                  <div className={cn(styles.cell, styles.cellDescription)} key={index}>
                    {content}
                  </div>
                ))}
              </div>
            </>
          );
        }}
      />
    );
  }

  const titles: string[] = [];
  const contents: string[] = [];

  defaultColumns.forEach((defaultColumn) => {
    titles.push(defaultColumn.title);
    contents.push(defaultColumn.content);
  });

  return (
    <table {...restProps} className={cn(styles.deliveryTable, className)}>
      <List
        {...restProps}
        tagName='tr'
        items={titles}
        renderChild={(title: string) => {
          return (
            <td className={cn(styles.td, styles.rowTitle)}>
              <div className={styles.row}>{title}</div>
            </td>
          );
        }}
      />
      <List
        {...restProps}
        tagName='tr'
        items={contents}
        renderChild={(content: string) => {
          return (
            <td className={cn(styles.td, styles.rowDescription)}>
              <div className={styles.row}>{content}</div>
            </td>
          );
        }}
      />
    </table>
  );
};

export default memo(DeliveryTable);
