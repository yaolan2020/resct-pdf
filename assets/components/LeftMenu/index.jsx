import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined } from '@ant-design/icons';
import cx from 'classnames';
import './index.less';

let currOpenKeys = [];

@inject('Breadcrumb', 'UI')
@observer
class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.menuData = this.props.data;
    this.crumbValues = [];
  }

  componentDidMount() {
    this.setBreadcrumbValues();
  }

  setBreadcrumbValues = () => {
    const { openMenuArr, selectMenuArr } = this.getActiveMenu(this.menuData);
    this.crumbValues = openMenuArr.concat(selectMenuArr);
    this.props.Breadcrumb.setValue(1, this.crumbValues);
  };

  toggleCollapsed = () => {
    this.props.UI.toggleCollapsed();
  };

  handleClick = (menuItem) => {
    const { keyPath } = menuItem;
    this.props.history.push(keyPath[0]);
    this.setBreadcrumbValues();
  };

  setOpenKeys = (keys) => {
    currOpenKeys = keys;
  };

  getActiveMenu = (menuData) => {
    const menuProps = { openMenuArr: [], selectMenuArr: [] };

    const currentPath = window.location.pathname + '/';
    let menuDataItem = menuData.find((item) => {
      return currentPath.indexOf(item.path + '/') !== -1;
    });

    if (!menuDataItem) {
      [menuDataItem] = menuData;
    }
    const { path, title } = menuDataItem;
    if (menuDataItem.children) {
      menuProps.openMenuArr.push({ path, title });
      const subMenuProps = this.getActiveMenu(menuDataItem.children);
      menuProps.openMenuArr = menuProps.openMenuArr.concat(subMenuProps.openMenuArr);
      if (subMenuProps.selectMenuArr.length > 0) {
        menuProps.selectMenuArr = menuProps.selectMenuArr.concat(subMenuProps.selectMenuArr);
      } else {
        menuProps.selectMenuArr.push({ path, title });
      }
    } else {
      menuProps.selectMenuArr.push({ path, title });
    }
    return menuProps;
  };

  renderMenu = (data) => {
    data.forEach((value) => {
      const { path, title, children } = value;
      value.key = path;
      value.label = (
        <span>
          <HomeOutlined />
          <span>{title}</span>
        </span>
      );
      delete value.icon;
      if (children && children.length > 0) {
        delete value.isParent;
        this.renderMenu(children);
      }
    });
  };

  render() {
    const { collapsed } = this.props.UI;
    const { openMenuArr, selectMenuArr } = this.getActiveMenu(this.menuData);
    const openKeyArr = openMenuArr.map((v) => v.path);
    const selectKeyArr = selectMenuArr.map((v) => v.path);

    if (currOpenKeys.length === 0 && openKeyArr.length > 0) {
      this.setOpenKeys(openKeyArr);
    }

    this.renderMenu(this.menuData);

    return (
      <div
        className={cx({
          'left-menu': true,
          'left-menu-collapsed': collapsed === true
        })}
      >
        <div className="open-menu" onClick={this.toggleCollapsed}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </div>
        <Menu
          defaultSelectedKeys={selectKeyArr}
          defaultOpenKeys={currOpenKeys}
          mode="inline"
          inlineCollapsed={collapsed}
          inlineIndent={15}
          onOpenChange={this.setOpenKeys}
          onClick={this.handleClick}
          items={this.menuData}
        ></Menu>
      </div>
    );
  }
}
export default withRouter(LeftMenu);
