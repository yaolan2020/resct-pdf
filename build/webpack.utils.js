module.exports = {
  getRandomMix: (count) => {
    let buf = '';
    const str = '0123456789abcdefghijklmnopqrstuvwsyz';
    const str_len = str.length;
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * str_len);
      buf += str.charAt(num);
    }
    return buf;
  },
  getCssPublicPath: (appConfig) => {
    if (appConfig.prodPublicPath === './') {
      return '../';
    }
    if (appConfig.prodPublicPath === '/') {
      return '/';
    }
    return appConfig.absolutePrefix;
  }
}
