import React, { FC, memo } from 'react';

import TemplateMain from '@Templates/TemplateMain';
import PagePrivacyPolicy from '@Pages/PagePrivacyPolicy';

const RoutePrivacyPolicy: FC = () => {
  return (
    <TemplateMain>
      <PagePrivacyPolicy />
    </TemplateMain>
  );
};

export default memo(RoutePrivacyPolicy);
