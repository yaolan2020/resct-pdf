import service from 'utils/service';
const loginApi = {
  //登录
  login: (params) => {
    return service.post('/login', params);
  },
  // 修改密码
  updatePassword: (params) => {
    return service.post('/updatePassword', params);
  },
  // 退出登录
  logout: () => {
    return service.get('/logout');
  },
  // 获取用户信息
  getUserInfo: () => {
    return service.post('/getUserInfo');
  },
  //功能权限管理
  getModuleRoles: (params) => {
    return service.post('/getModuleRoles', params);
  }
};
export default loginApi;
