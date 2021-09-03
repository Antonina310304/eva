import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import useModals from '@Hooks/useModals';
import { Forms } from '@Pages/PageContacts/typings';
import styles from './ButtonsContactForms.module.css';

export interface ButtonsContactFormsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  contactDatas: Forms;
}

const ButtonsContactForms: FC<ButtonsContactFormsProps> = (props) => {
  const { className, contactDatas, ...restProps } = props;
  const { items, text, title } = contactDatas;
  const [, { openModal }] = useModals();

  console.log('contactDatas', contactDatas);

  const handleButtonClick = useCallback(
    (item) => {
      if (item.href) {
        window.location.assign(item.href);
      }

      if (item.data.action === 'contacts') {
        openModal('Contacts', {
          title: item.data.title,
          email: item.data.email,
          director: item.data.director,
        });
      }

      if (item.data.action === 'contacts-accounting') {
        openModal('ContactsAccounting', {
          title: item.data.title,
          email: item.data.email,
        });
      }
    },
    [openModal],
  );

  return (
    <div {...restProps} className={cn(styles.buttonsContactForms, className)}>
      <div className={styles.title}>{title}</div>

      <div className={styles.textWrapper}>
        {text.map((paragraph, index) => (
          <div className={styles.paragraph} key={index}>
            {paragraph}
          </div>
        ))}
      </div>

      <div className={styles.buttonsWrapper}>
        {items.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.itemTitle}>{item.title}</div>
            <Button className={styles.button} theme='blank' onClick={() => handleButtonClick(item)}>
              {item.text}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ButtonsContactForms);
