import React, { FC } from 'react';
import loadable from '@loadable/component';

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
const PageCategory = loadable(() => import('@Pages/PageCategory'));
const TemplateMain = loadable(() => import('@Templates/TemplateMain'));

const App: FC = () => {
  const page = usePage();
  const meta = useMeta();

  return (
    <ModalsProvider>
      {(() => {
        switch (page) {
          case 'Index':
            return (
              <TemplateMain>
                <PageIndex />
              </TemplateMain>
            );

          case 'Category':
            return (
              <TemplateMain>
                <PageCategory />
              </TemplateMain>
            );

          case 'Error':
            return (
              <TemplateMain>
                {meta ? (
                  <TemplateMain>
                    <PageError />
                  </TemplateMain>
                ) : (
                  <PageError />
                )}
              </TemplateMain>
            );

          default:
            return <TemplateMain />;
        }
      })()}
    </ModalsProvider>
  );
};

export default App;
