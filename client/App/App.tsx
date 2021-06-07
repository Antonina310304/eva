import React, { FC } from 'react';
import loadable from '@loadable/component';

import MediaProvider from '@divanru/ts-ui/Media/MediaProvider';

import usePage from '@Hooks/usePage';
import useMeta from '@Hooks/useMeta';
import ModalsProvider from '@Contexts/Modals/ModalsProvider';
import './App.css';

export interface Data {
  page: string;
  productId: number;
}

const PageIndex = loadable(() => import('@Pages/PageIndex'));
const PageError = loadable(() => import('@Pages/PageError'));
const TemplateMain = loadable(() => import('@Templates/TemplateMain'));

const App: FC = () => {
  const page = usePage();
  const meta = useMeta();

  return (
    <MediaProvider>
      <ModalsProvider>
        {(() => {
          switch (page) {
            case 'Index':
              return (
                <TemplateMain>
                  <PageIndex />
                </TemplateMain>
              );

            case 'Error':
              return (
                <>
                  {meta ? (
                    <TemplateMain>
                      <PageError />
                    </TemplateMain>
                  ) : (
                    <PageError />
                  )}
                </>
              );

            default:
              return <TemplateMain />;
          }
        })()}
      </ModalsProvider>
    </MediaProvider>
  );
};

export default App;
