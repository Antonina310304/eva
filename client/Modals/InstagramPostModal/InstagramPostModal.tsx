import React, { memo, FC, useState, useCallback } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
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
import { InstagramPostData } from '@Types/InstagramPost';
import ProductCard from './elems/ProductCard';
import { InstagramProductData } from './elems/Preview';

import styles from './InstagramPostModal.module.css';

export interface InstagramPostModalProps {
  className?: string;
  modal: IModal;
}

const InstagramPostModal: FC<InstagramPostModalProps> = (props) => {
  const { className, modal } = props;
  const { posts, selectedPost } = modal.data;
  const [, { closeAllModals }] = useModals();
  const { isMobile } = useMedias();
  const [postIndex, setPostIndex] = useState(
    posts.findIndex((postItem: InstagramPostData) => postItem.id === selectedPost.id),
  );
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const meta = useMeta({ ssr: true });

  const handleClose = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

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
    <Modal
      className={cn(styles.instagramPostModal, [className])}
      id={modal.id}
      visible={modal.visible}
      onClose={handleClose}
    >
      <div className={styles.modalView}>
        <div className={cn(styles.arrowBackground, { [styles.prev]: true })} onClick={handlePrev}>
          <div className={styles.arrow} />
        </div>

        {isMobile ? (
          <Scroller className={styles.mobileScroller} invisible>
            <div className={styles.container}>
              <div className={styles.header}>
                <IconClose onClick={handleClose} />
              </div>

              <div className={styles.content}>
                <div className={styles.post}>
                  <Image className={styles.photo} src={posts[postIndex].img} />
                </div>

                <div className={styles.caruselWrapper}>
                  <Gallery
                    className={styles.gallery}
                    slideIndex={slideIndex}
                    onChangeProgress={handleChangeProgress}
                    onChangeCurrent={handleChangeCurrent}
                  >
                    {posts[postIndex].products.map(
                      (product: InstagramProductData, index: number) => (
                        <div className={styles.item}>
                          <ProductCard
                            className={styles.productCard}
                            product={product}
                            key={index}
                          />
                        </div>
                      ),
                    )}
                  </Gallery>

                  <ProgressBar className={styles.track} track={track} />
                </div>
              </div>

              <div className={styles.postInfo}>
                <div className={styles.author}>
                  <div className={styles.postText}>Автор фотографии</div>
                  <Link className={styles.linkToInstagram} to={posts[postIndex].link} view='simple'>
                    <div className={styles.instagramIcon} />
                    <div className={styles.authorNikname}>{`@${posts[postIndex].author}`}</div>
                  </Link>
                </div>

                <div className={styles.share}>
                  <div className={styles.postText}>Поделиться в соц. сетях</div>
                  <Share className={styles.shareIcons} socials={meta.data.socials} />
                </div>
              </div>
            </div>
          </Scroller>
        ) : (
          <div className={styles.container}>
            <div className={styles.header}>
              <IconClose onClick={handleClose} />
            </div>

            <div className={styles.content}>
              <div className={styles.post}>
                <Image className={styles.photo} src={posts[postIndex].img} />
              </div>

              <Scroller className={styles.productsScroller}>
                <div className={styles.productsWrapper}>
                  {posts[postIndex].products.map((product: InstagramProductData, index: number) => (
                    <ProductCard className={styles.productCard} product={product} key={index} />
                  ))}
                </div>
              </Scroller>
            </div>

            <div className={styles.postInfo}>
              <div className={styles.author}>
                <div className={styles.postText}>Автор фотографии</div>
                <Link className={styles.linkToInstagram} to={posts[postIndex].link} view='simple'>
                  <div className={styles.instagramIcon} />
                  <div className={styles.authorNikname}>{`@${posts[postIndex].author}`}</div>
                </Link>
              </div>

              <div className={styles.share}>
                <div className={styles.postText}>Поделиться в соц. сетях</div>
                <Share className={styles.shareIcons} socials={meta.data.socials} />
              </div>
            </div>
          </div>
        )}

        <div className={cn(styles.arrowBackground, { [styles.next]: true })} onClick={handleNext}>
          <div className={styles.arrow} />
        </div>
      </div>
    </Modal>
  );
};

export default memo(InstagramPostModal);
