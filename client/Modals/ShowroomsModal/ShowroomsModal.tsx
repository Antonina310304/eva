import React, { FC, memo, useState, useCallback } from 'react';
import cn from 'classnames';

import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import List from '@UI/List';
import styles from './ShowroomsModal.module.css';
import ListItem from './elems/ListItem';

const ShowroomsModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { showrooms } = modal.data;
  const [openedShowroom, setOpenedShowroom] = useState(() => {
    return showrooms.length === 1 ? showrooms[0].id : null;
  });

  const handleClickItem = useCallback((_e, showroom) => {
    setOpenedShowroom(showroom.id);
  }, []);

  const handleClickHeadItem = useCallback(
    (_e, showroom) => {
      if (showroom.id !== openedShowroom) return;

      setTimeout(() => setOpenedShowroom(null));
    },
    [openedShowroom],
  );

  return (
    <ModalSidebar
      {...restProps}
      className={cn(styles.modal, className)}
      cnContent={styles.modalContent}
      title='Этот товар есть в шоуруме'
      view='default'
      modal={modal}
    >
      <List
        className={styles.list}
        items={showrooms}
        renderChild={(showroom: any) => (
          <ListItem
            className={styles.item}
            opened={showroom.id === openedShowroom}
            showroom={showroom}
            onClick={(e) => handleClickItem(e, showroom)}
            onClickHead={(e) => handleClickHeadItem(e, showroom)}
          />
        )}
      />
    </ModalSidebar>
  );
};

export default memo(ShowroomsModal);
