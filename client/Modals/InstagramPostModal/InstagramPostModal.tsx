import React, { memo, FC, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';

import ModalMain from '@Components/ModalMain';
import Share from '@Components/Share';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import Scroller from '@UI/Scroller';
import { Modal as IModal } from '@Contexts/Modals';
import Link from '@UI/Link';
import Image from '@UI/Image';
import IconClose from '@UI/IconClose';
import useMedias from '@Hooks/useMedias';
import useModals from '@Hooks/useModals';
import useMeta from '@Queries/useMeta';
import { ProductData } from '@Types/Product';
import { InstagramPostData } from '@Types/InstagramPost';
import ProductCard from './elems/ProductCard';
import styles from './InstagramPostModal.module.css';

export interface InstagramPostModalProps {
  className?: string;
  modal: IModal;
}

export interface InstagramProductData extends ProductData {
  img: string;
  orientation: 'portrait' | 'landscape';
}

const InstagramPostModal: FC<InstagramPostModalProps> = (props) => {
  const { className, modal } = props;
  const { posts, selectedPost } = modal.data;
  const [, { closeModal }] = useModals();
  const { isMobile } = useMedias();
  const [postIndex, setPostIndex] = useState(
    posts.findIndex((postItem: InstagramPostData) => postItem.id === selectedPost.id),
  );
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const meta = useMeta({ ssr: true });
  const currentPost = useMemo(() => posts[postIndex], [postIndex, posts]);

  const handleClose = useCallback(() => {
    closeModal('InstagramPost');
  }, [closeModal]);

  const handlePrev = useCallback(() => {
    if (postIndex === 0) {
      setPostIndex(posts.length - 1);
    } else {
      setPostIndex(postIndex - 1);
    }
  }, [postIndex, posts.length]);

  const handleNext = useCallback(() => {
    if (postIndex !== posts.length - 1) {
      setPostIndex(postIndex + 1);
    } else {
      setPostIndex(0);
    }
  }, [postIndex, posts.length]);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlideIndex(current);
  }, []);

  if (!meta.isSuccess) return null;

  return (
    <ModalMain
      className={cn(styles.instagramPostModal, [className])}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.modalView}>
        <div className={cn(styles.arrowBackground, { [styles.prev]: true })} onClick={handlePrev}>
          <div className={styles.arrow} />
        </div>

        <Scroller className={styles.mobileScroller} invisible={isMobile}>
          <div className={styles.container}>
            <div className={styles.header}>
              <IconClose onClick={handleClose} />
            </div>

            <div className={styles.content}>
              <div className={styles.post}>
                <Image className={styles.photo} src={currentPost.img} />
              </div>

              {isMobile ? (
                <div className={styles.caruselWrapper}>
                  <Gallery
                    className={styles.gallery}
                    slideIndex={slideIndex}
                    onChangeProgress={handleChangeProgress}
                    onChangeCurrent={handleChangeCurrent}
                  >
                    {currentPost.products.map((product: InstagramProductData, index: number) => (
                      <div className={styles.item}>
                        <ProductCard className={styles.productCard} product={product} key={index} />
                      </div>
                    ))}
                  </Gallery>

                  <ProgressBar className={styles.track} track={track} />
                </div>
              ) : (
                <Scroller className={styles.productsScroller}>
                  <div className={styles.productsWrapper}>
                    {currentPost.products.map((product: InstagramProductData, index: number) => (
                      <ProductCard className={styles.productCard} product={product} key={index} />
                    ))}
                  </div>
                </Scroller>
              )}
            </div>

            <div className={styles.postInfo}>
              <div className={styles.author}>
                <div className={styles.postText}>Автор фотографии</div>
                <Link className={styles.linkToInstagram} to={currentPost.link} view='simple'>
                  <div className={styles.instagramIcon} />
                  <div className={styles.authorNikname}>{`@${currentPost.author}`}</div>
                </Link>
              </div>

              <div className={styles.share}>
                <div className={styles.postText}>Поделиться в соц. сетях</div>
                <Share className={styles.shareIcons} socials={meta.data.socials} />
              </div>
            </div>
          </div>
        </Scroller>

        <div className={cn(styles.arrowBackground, { [styles.next]: true })} onClick={handleNext}>
          <div className={styles.arrow} />
        </div>
      </div>
    </ModalMain>
  );
};

export default memo(InstagramPostModal);
