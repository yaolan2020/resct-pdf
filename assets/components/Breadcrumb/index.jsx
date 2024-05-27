import React from 'react';
import { observer, inject } from 'mobx-react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import authUtils from 'utils/authUtils';
import './index.less';

@inject('Breadcrumb')
@observer
class CustomBreadcrumb extends React.Component {
  render() {
    const { values: breadcrumbValues } = this.props.Breadcrumb;
    return (
      <div className="breadcrumb-page">
        <Breadcrumb>
          <Breadcrumb.Item href={authUtils.getHomePath()}>
            <HomeOutlined />
          </Breadcrumb.Item>
          {breadcrumbValues.map((item, index) => {
            let cn = 'breadcrumb-item';
            if (breadcrumbValues.length - 1 === index) {
              cn = 'breadcrumb-item-last';
            }
            if (item) {
              return (
                <Breadcrumb.Item className={cn} key={index}>
                  {item.title}
                </Breadcrumb.Item>
              );
            }
            return null;
          })}
        </Breadcrumb>
      </div>
    );
  }
}
export default CustomBreadcrumb;
