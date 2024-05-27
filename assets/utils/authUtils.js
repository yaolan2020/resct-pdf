import routerPath from 'router/routerPath';
import loginApi from '../api/login';

const authUtils = (() => {
  const { app, modTypes, modules } = routerPath;
  const storageKeys = ['tokenId', 'userName', 'roleRank'];
  let moduleRoles = [];

  return {
    login: (data) => {
      sessionStorage.setItem(storageKeys[0], data.tokenId);
      sessionStorage.setItem(storageKeys[1], data.userInfo.name);
      sessionStorage.setItem(storageKeys[2], data.userInfo.roleRank);
      window.location.href = app.root;
    },

    logout: () => {
      loginApi.logout().then(() => {
        authUtils.clearStorage();
        window.location.href = app.login;
      });
    },

    getRoleRank: () => {
      return sessionStorage.getItem(storageKeys[2]);
    },

    getUserName: () => {
      return sessionStorage.getItem(storageKeys[1]);
    },

    getTokenId: () => {
      return sessionStorage.getItem(storageKeys[0]);
    },

    containsSubModule: (modName, dataList) => {
      let isIncluded = false;
      for (let i in dataList) {
        if (dataList[i].name === modName) {
          isIncluded = true;
          break;
        }
        if (dataList[i].children) {
          isIncluded = authUtils.containsSubModule(modName, dataList[i].children);
          if (isIncluded) {
            break;
          }
        }
      }
      return isIncluded;
    },

    removeItem: (module, dataList) => {
      let children = module.children;
      if (children) {
        for (let i = 0; i < children.length; i++) {
          if (!authUtils.containsSubModule(children[i].name, dataList)) {
            module.children.splice(i, 1);
            i -= 1;
          } else {
            authUtils.removeItem(children[i], dataList);
          }
        }
      }
    },

    setModuleRoles: (data) => {
      authUtils.clearModuleRoles();
      if (data) {
        for (let i in modules) {
          let m = modules[i];
          if (authUtils.containsSubModule(m.name, data)) {
            authUtils.removeItem(m, data);
            moduleRoles.push(m);
          }
        }
      }
    },

    clearModuleRoles: () => {
      moduleRoles.length = 0;
    },

    getModuleRoles: () => {
      return moduleRoles;
    },

    getSubModules: (name) => {
      return moduleRoles.find((item) => item.name === name);
    },

    getHomePath: () => {
      return app.root;
    },

    getLoginPath: () => {
      return app.login;
    },

    getModTypes: () => {
      return modTypes;
    },

    clearStorage: () => {
      storageKeys.map((k) => window.sessionStorage.removeItem(k));
    },

    /*=============以下方法测试使用===============*/
    testLogin: (data) => {
      sessionStorage.setItem(storageKeys[0], 'testid20190101');
      sessionStorage.setItem(storageKeys[1], data.username);
      window.location.href = app.root;
    },

    testSetModuleRoles: () => {
      if (modules) {
        moduleRoles = modules;
      }
    }
  };
})();

export default authUtils;
