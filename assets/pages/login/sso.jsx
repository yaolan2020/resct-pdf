import React, { useEffect } from 'react';
import loginApi from 'api/login';
import utils from 'utils';
import authUtils from 'utils/authUtils';
import './index.less';

const Sso = () => {
  useEffect(() => {
    const tokenId = utils.getQueryString(window.location.search, 'tokenId');
    sessionStorage.setItem('tokenId', tokenId);
    loginApi.verifyLoginStatus().then((res) => {
      const { data } = res.data;
      if (data) {
        authUtils.login(data);
      }
    });
  }, []);

  return <div></div>;
};
export default Sso;
