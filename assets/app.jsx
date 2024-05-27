import React from 'react';
// 样式兼容
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';
// 多语言
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
/*
 *引入与navigator.languages[0]所对应的语言；
 *如果没有引入对应的语言，会使用默认的“en”；
 *导致FormattedMessage的映射不会成功；
 */

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RouteFilterHoc from 'components/Hoc/routeFilterHoc'; // 路由拦截

import routerPath from 'router/routerPath';
import langUtils from 'utils/langUtils';
import messages from './lang/index';

import './app.less';

import loadable from '@loadable/component';

const Login = loadable(() => import('pages/login'));
const Sso = loadable(() => import('pages/login/sso'));
const Layout = loadable(() => import('pages/layout'));

// @RouteFilterHoc
class App extends React.Component {
  render() {
    const currentLang = langUtils.getCurrentLang();
    return (
      <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
        <ConfigProvider
          locale={messages[currentLang].antdLocal}
          theme={{
            token: {
              colorPrimary: '#3E71F9',
              borderRadius: 2
            },
            components: {
              Modal: {
                colorFillContent: 'red',
                colorIconHover: '#fff'
              },
              // 抽屉关闭按钮hover默认没有背景色，app.less手动控制
              Drawer: {
                colorIconHover: '#fff'
              }
            }
          }}
        >
          <IntlProvider
            locale={currentLang}
            messages={messages[currentLang].local}
            defaultLocale="zh"
          >
            <BrowserRouter>
              <Switch>
                {/* <Route exact path={routerPath.app.sso} component={Sso} />
                <Route exact path={routerPath.app.login} component={Login} /> */}
                <Route path={routerPath.app.root} component={Layout} />
                {/* <Route
                exact
                path={'/'}
                render={() => <Redirect to={routerPath.app.root}></Redirect>}
              /> */}
              </Switch>
            </BrowserRouter>
          </IntlProvider>
        </ConfigProvider>
      </StyleProvider>
    );
  }
}
export default App;
