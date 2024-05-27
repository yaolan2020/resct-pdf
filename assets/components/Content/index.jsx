import React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import Breadcrumb from 'components/Breadcrumb';
import LeftMenu from 'components/LeftMenu';
import NoAccess from 'components/NoAccess';
import NotFound from 'components/NotFound';
import authUtils from 'utils/authUtils';
import './index.less';
import cx from 'classnames';

@inject('UI')
@observer
class Content extends React.Component {
  render() {
    const { collapsed } = this.props.UI;
    const { name, pageComponents } = this.props;
    const { path, children, hiddle } = authUtils.getSubModules(name);
    const isNoAccess = !children || children.length === 0 || hiddle;

    const getPageComponent = (routeName) => {
      if (pageComponents && pageComponents[routeName]) {
        return pageComponents[routeName];
      }
      if (isNoAccess) {
        return NoAccess;
      }
      return NotFound;
    };

    const getFirstPageComponent = (routeName, arr) => {
      if (arr) {
        for (let i in arr) {
          if (!arr[i].isParent) {
            return getPageComponent(arr[i].name);
          }
        }
      }
      return getPageComponent(routeName);
    };

    const getRouteList = (children, list) => {
      let routeList = list || [];
      if (children) {
        children.map((item, index) => {
          routeList.push(item);
          if (item && item.children) {
            item['isParent'] = true;
            getRouteList(item.children, routeList);
          }
        });
      }
      return routeList;
    };

    const routeList = getRouteList(children);

    return (
      <div className="bw-content">
        {!isNoAccess ? <LeftMenu data={children} /> : null}
        <div
          className={cx({
            'right-content': true,
            'right-content-collapsed': collapsed === true,
            'right-content-all': isNoAccess
          })}
        >
          {/* <Breadcrumb /> */}
          <Switch>
            <Route exact path={path} component={getFirstPageComponent(name, routeList)} />
            {routeList.map((item, index) => (
              <Route exact key={index} path={item.path} component={getPageComponent(item.name)} />
            ))}
          </Switch>
        </div>
      </div>
    );
  }
}
export default Content;
