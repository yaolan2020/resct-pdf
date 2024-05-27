import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import langUtils from 'utils/langUtils';

const LangDropdown = () => (
  <Dropdown
    menu={{
      items: langUtils.getLangArray().map(({ lang, title }) => ({
        key: lang,
        label: title
      })),
      onClick: (e) => langUtils.changeCurrentLang(e.key)
    }}
    trigger={['click']}
  >
    <span>
      {langUtils.getLangTitle()}
      <DownOutlined />
    </span>
  </Dropdown>
);

export default LangDropdown;
