module.exports = {
  absolutePrefix : '/test/',
  relativePrefix: 'test/',
  prodPublicPath: '/'
  /* absolutePrefix : '/',
  relativePrefix: '',
  prodPublicPath: '/'  */
}
/**
 * 提示2
 * 设置如下时：
 * prodPublicPath = '/' 时，
 * absolutePrefix = '/',
 * relativePrefix = '',
 * 请删除app.jsx下的/路径的Redirect组件，避免进入死循环。
 */
/**
 * 提示1
 * 当不使用路由时允许设置相对路径；
 * 设置 prodPublicPath = './' 时，
 * 必须设置:
 * absolutePrefix = '/',
 * relativePrefix = '',
 */
