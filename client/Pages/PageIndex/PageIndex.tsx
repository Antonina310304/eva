import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import MainComponent from '@Components/MainComponent';
import Footer from '@Components/Footer';

import Header from '@Components/Header';
import BottomUserMenu from '@Components/BottomUserMenu';
import useMediaQuery from '@Hooks/useMediaQuery';
import mockBreadcrumbsItems from './mocks';
import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, ...restProps } = props;
  const isMobile = useMediaQuery('(max-width: 1023px)');

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <Header />
      <MainComponent breadcrumbs={mockBreadcrumbsItems}>
        <p>
          Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев
          более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить
          навык публичных выступлений в домашних условиях. При создании генератора мы использовали
          небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от
          двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и
          живым для визуально-слухового восприятия.
        </p>
        <p>
          По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает
          у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum,
          текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый
          колорит советских времен.
        </p>
      </MainComponent>
      <Footer />
      {isMobile && <BottomUserMenu />}
    </div>
  );
};

export default memo(PageIndex);
