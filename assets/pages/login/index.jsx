import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Input, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LangDropdown from 'components/LangDropdown';
import loginApi from 'api/login';
import utils from 'utils';
import authUtils from 'utils/authUtils';
import './index.less';

const Login = () => {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    const isRemember = window.localStorage.getItem('isRemember');
    const flag = isRemember ? JSON.parse(isRemember) : false;
    setIsRemember(flag);
    if (flag) {
      const username = window.localStorage.getItem('username');
      const pwd = window.localStorage.getItem('pwd');
      const decryptPwd = utils.decrypt(pwd); // 解密
      setUsername(username);
      setPwd(decryptPwd);
    }
  }, []);

  const handleSubmit = () => {
    if (!username || !pwd) {
      message.warning('用户名或密码不能为空');
      return false;
    }

    const params = { username, pwd };

    //测试使用
    // authUtils.testLogin(params);

    loginApi.login(params).then((res) => {
      if (res && res.data.data) {
        authUtils.login(res.data.data);
        window.localStorage.setItem('isRemember', isRemember);
        if (isRemember) {
          const encryptedPwd = utils.encrypt(pwd); // 加密
          window.localStorage.setItem('username', username);
          window.localStorage.setItem('pwd', encryptedPwd);
        } else {
          window.localStorage.removeItem('username');
          window.localStorage.removeItem('pwd');
        }
      }
    });
  };

  return (
    <div className="login-component" style={{ height: window.innerHeight }}>
      <div className="login-wrap">
        <div className="system-name">{globalConfig.systemName}</div>
        <Input.Group>
          <Input
            bordered={false}
            size="large"
            prefix={<UserOutlined style={{ fontSize: '20px', color: '#9F9F9F' }} />}
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="请输入用户名"
            value={username}
            style={{ marginBottom: '20px' }}
            onPressEnter={handleSubmit}
          />
          <Input.Password
            bordered={false}
            size="large"
            prefix={<LockOutlined style={{ fontSize: '20px', color: '#9F9F9F' }} />}
            type="password"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            placeholder="请输入密码"
            value={pwd}
            onPressEnter={handleSubmit}
          />
        </Input.Group>
        <Checkbox checked={isRemember} onChange={(e) => setIsRemember(e.target.checked)}>
          记住密码
        </Checkbox>
        <Button type="primary" className="submit" onClick={handleSubmit}>
          登录
        </Button>
      </div>
      <div className="lang">
        <LangDropdown />
      </div>
    </div>
  );
};
export default injectIntl(Login);
