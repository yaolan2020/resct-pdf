import React from 'react';

import loadable from '@loadable/component';
import Content from 'components/Content';

const pageComponents = {
  sub1: loadable(() => import('pages/home/sub1')),
  sub2: loadable(() => import('pages/home/sub2')),
  sub3: loadable(() => import('pages/home/sub3'))
};
const Mod1 = () => {
  return <Content name="home" pageComponents={pageComponents} />;
};
export default Mod1;
