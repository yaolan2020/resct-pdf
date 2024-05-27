import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { Dropdown, Image } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import authUtils from 'utils/authUtils';
import headerIcon from 'public/imgs/headerIcon.png';
import UserInfo from './userInfo';
import UpdatePassword from './updatePassword';
import cx from 'classnames';
import './index.less';

@inject('Breadcrumb')
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.currentModuleTitle = {};
    this.state = {
      current: this.props.location.pathname,
      visible: false,
      myVisible: false,
      msgData: 0
    };
  }

  handleLogout = (e) => {
    if (e.key === 'signout') {
      authUtils.logout();
    }
    if (e.key === 'update') {
      this.setState({ visible: true });
    }
    if (e.key === 'my') {
      this.setState({ myVisible: true });
    }
  };

  handlePage = (e, item) => {
    const { isNewWindow, urlPath, path, title } = item;
    if (isNewWindow) {
      const tokenId = authUtils.getTokenId();
      window.open(`${urlPath}?tokenId=${tokenId}`);
      return false;
    }
    this.props.Breadcrumb.setValue(0, { path, title });
    this.props.history.push(path);
    this.setState({ current: path });
  };

  handleIndex = (e) => {
    const { pathname } = this.props.location;
    if (pathname !== e.target.id) {
      window.location.href = e.target.id;
    }
  };

  componentDidMount() {
    this.props.Breadcrumb.setValue(0, this.currentModuleTitle);
  }

  render() {
    const { current, visible, myVisible } = this.state;
    const { modules } = this.props;

    const userName = authUtils.getUserName();
    const homePath = authUtils.getHomePath();

    const loginMenu = [
      { key: 'my', label: '个人信息维护' },
      { key: 'update', label: '修改密码' },
      {
        key: 'signout',
        label: <FormattedMessage id={!userName ? 'login.button' : 'head.logout'} />
      }
    ];

    const isActive = (obj, index) => {
      let active = current.indexOf(obj.path) !== -1;
      if (!active && index === 0 && homePath === current) {
        active = true;
      }
      if (active) {
        this.currentModuleTitle = { path: obj.path, title: obj.title };
      }
      return active;
    };

    const loopNavMap = (data) =>
      data.map((item, index) => (
        <li
          key={item.name}
          className={cx({ active: isActive(item, index) })}
          onClick={(e) => this.handlePage(e, item)}
        >
          {item.title}
        </li>
      ));

    return (
      <div className="header-component">
        <div className="header-left">
          <span className="system-name" id={homePath} onClick={this.handleIndex}>
            {globalConfig.systemName}
          </span>
          <ul>{modules && modules.length > 1 && loopNavMap(modules)}</ul>
        </div>
        <div className="header-right">
          <Image width={30} src={headerIcon} preview={false} />
          {/* <Dropdown
            menu={{
              items: loginMenu,
              onClick: this.handleLogout
            }}
            trigger={['click']}
          >
            <span>
              <span style={{ color: '#fff', fontSize: '14px', margin: '0 3px' }}>
                {userName || <FormattedMessage id="head.nologin" />}
              </span>
              <DownOutlined />
            </span>
          </Dropdown> */}
        </div>
        {UpdatePassword ? (
          <UpdatePassword visible={visible} onCancel={() => this.setState({ visible: false })} />
        ) : null}
        {myVisible ? (
          <UserInfo visible={myVisible} onCancel={() => this.setState({ myVisible: false })} />
        ) : null}
      </div>
    );
  }
}
export default injectIntl(withRouter(Header));
