const paths = {
  modTypes: 'home',
  app: {
    root: '/',
    login: '/login',
    sso: '/sso'
  },
  modules: [
    {
      title: '项目模块1',
      path: '/home',
      name: 'home',
      hiddle: true,
      children: [
        {
          title: '子模块1',
          path: '/home/sub1',
          name: 'sub1',
          icon: 'home'
        },
        {
          title: '子模块2',
          path: '/home/sub2',
          name: 'sub2',
          icon: 'area-chart'
        },
        {
          title: '子模块3',
          path: '/home/sub3',
          name: 'sub3',
          icon: 'area-chart'
        }
      ]
    }
  ]
};

let routerPrefix = process.env.APP_PREFIX;
routerPrefix = routerPrefix.substring(0, routerPrefix.length - 1);

const initAppPaths = function (obj) {
  for (let key in obj) {
    if (obj[key] instanceof Object) {
      initAppPaths(obj[key]);
    } else {
      obj[key] = routerPrefix + obj[key];
    }
  }
};

const initModulesPaths = (obj) => {
  for (let key in obj) {
    if (obj[key] instanceof Object) {
      initModulesPaths(obj[key]);
    }
    if (obj[key].path) {
      obj[key].path = routerPrefix + obj[key].path;
    }
  }
};

const initPaths = (obj) => {
  initAppPaths(obj['app']);
  initModulesPaths(obj['modules']);
};

initPaths(paths);

export default paths;
