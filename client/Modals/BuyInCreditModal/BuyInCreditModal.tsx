import React, { FC, HTMLAttributes, memo, useCallback, useState, useEffect } from 'react';
import cn from 'classnames';

import { ApiOrder } from '@Api/Order';
import { Modal as IModal } from '@Contexts/Modals';
import Modal from '@Components/Modal';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import IconClose from '@UI/IconClose';
import Price from '@UI/Price';
import Button from '@UI/Button';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import Scroller from '@UI/Scroller';
import { InstallmentBank, InstallmentVariant } from '@Types/InstallmentBank';
import { NetworkStatus } from '@Types/Base';
import Variants from './elems/Variants';
import Numbers from './elems/Numbers';
import images from './images';
import styles from './BuyInCreditModal.module.css';

export interface BuyInCreditModalProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  modal: IModal;
}

const Container: FC<any> = ({ children, ...restContainerProps }) => {
  const { isMobile } = useMedias();

  return isMobile ? (
    <div {...restContainerProps}>{children}</div>
  ) : (
    <Scroller {...restContainerProps}>{children}</Scroller>
  );
};

const BuyInCreditModal: FC<BuyInCreditModalProps> = (props) => {
  const { className, modal } = props;
  const { productId } = modal.data;
  const [, { closeModal }] = useModals();
  const { isMobile } = useMedias();
  const [status, setStatus] = useState<NetworkStatus>('pending');
  const [banks, setBanks] = useState<InstallmentBank[]>([]);
  const [selectedBank, setSelectedBank] = useState<InstallmentBank>(null);
  const [selectedVariant, setSelectedVariant] = useState<InstallmentVariant>(null);

  const handleChangeBank = useCallback(
    (_e, tab: Tab) => {
      const bank = banks.find((b) => b.id === tab.id);

      setSelectedBank(bank);
      setSelectedVariant(bank.variants[0]);
    },
    [banks],
  );

  const handleChangeVariant = useCallback((_e, variant: InstallmentVariant) => {
    setSelectedVariant(variant);
  }, []);

  const handleBuy = useCallback(() => {
    const params = {
      shopProductId: productId,
      data: { isModular: false },
      paymentTypeId: selectedVariant.id,
      isCredit: true,
    };

    // openModal('cart', { params });

    closeModal(modal.id);
  }, [closeModal, modal.id, productId, selectedVariant]);

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  useEffect(() => {
    async function load() {
      setStatus('loading');

      try {
        const resBanks = await ApiOrder.getInstallmentVariants({ productId });

        setBanks(resBanks);
        setSelectedBank(resBanks[0]);
        setSelectedVariant(resBanks[0].variants[0]);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        console.log(err);
      }
    }

    load();
  }, [productId]);

  if (status !== 'success') return null;

  return (
    <Modal
      className={cn(styles.modal, className)}
      id={modal.id}
      visible={modal.visible}
      onClose={handleClose}
    >
      <div className={cn(styles.container, className)}>
        <div className={styles.head}>
          <h3 className={styles.title}>Кредит без переплаты</h3>
          <IconClose
            className={styles.iconClose}
            view={isMobile ? 'default' : 'circle'}
            onClick={handleClose}
          />
        </div>

        <Container className={styles.content} invisible={isMobile}>
          <ButtonTabs
            defaultValue={selectedBank.id}
            tabs={banks.map((bank) => ({
              id: bank.id,
              label: bank.id,
            }))}
            onChangeTab={handleChangeBank}
          />

          <img
            className={styles.bankLogo}
            src={images[selectedBank.id]}
            alt={`Logo of bank ${selectedBank.id}`}
          />

          <Numbers
            className={styles.numbers}
            variant={selectedVariant}
            style={{ color: selectedBank.brandColor }}
          />

          {selectedBank.variants.length > 1 && (
            <div className={styles.variants}>
              <Variants
                selectedVariant={selectedVariant}
                variants={selectedBank.variants}
                color={selectedBank.brandColor}
                onChange={handleChangeVariant}
              />
            </div>
          )}

          <div className={styles.description}>{selectedVariant.description}</div>
          {selectedVariant.hint && <div className={styles.hint}>{selectedVariant.hint}</div>}

          <Button
            className={styles.button}
            wide
            color={selectedBank.brandColor}
            onClick={handleBuy}
          >
            {selectedVariant.price ? (
              <>
                {`Купить за `}
                <Price className={styles.price} price={selectedVariant.price} />
                /мес
              </>
            ) : (
              'Купить'
            )}
          </Button>
        </Container>
      </div>
    </Modal>
  );
};

export default memo(BuyInCreditModal);
