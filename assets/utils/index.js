import CryptoJS from 'crypto-js';

const utils = {
  getQueryString: (search, name) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return null;
  },

  isNullOrEmpty: (obj) => {
    if (!obj || obj.length == 0) {
      return true;
    }
    if (obj instanceof Object) {
      for (let k in obj) {
        if (obj[k]) {
          return false;
        }
      }
      return true;
    }
    return false;
  },
  // 加密
  encrypt: (word) => {
    var key = CryptoJS.enc.Utf8.parse('ed618e0f-4dc6-4a9d-90c4-10352f0ffa13');
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
  // 解密
  decrypt: (word) => {
    if (!word) {
      return '';
    }
    var key = CryptoJS.enc.Utf8.parse('ed618e0f-4dc6-4a9d-90c4-10352f0ffa13');
    var decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
  //下载
  download: (api, id) => {
    api.download(id).then((res) => {
      utils.downloadHandle(res);
    });
  },
  downloadHandle: (res) => {
    var str = res.headers['content-disposition'];
    var name = '未命名文件';
    if (str) {
      var index = str.indexOf('=');
      name = str.slice(index + 1);
    }
    var eleLink = document.createElement('a');
    eleLink.setAttribute('download', decodeURI(name));
    eleLink.style.display = 'none';
    eleLink.setAttribute('href', URL.createObjectURL(res.data));
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  }
};
export default utils;
