import zh_CN from './zh_CN';
import zh_TW from './zh_TW';
import en_US from './en_US';
import antdCN from 'antd/locale/zh_CN';
import antdTW from 'antd/locale/zh_TW';
import antdEN from 'antd/locale/en_US';
import dayjsCN from 'dayjs/locale/zh-cn';
import dayjsTW from 'dayjs/locale/zh-tw';
import dayjsEN from 'dayjs/locale/en';

const messages = {
  'zh-CN': {
    local: zh_CN,
    dayjsLocal: dayjsCN,
    antdLocal: antdCN
  },
  'zh-TW': {
    local: zh_TW,
    dayjsLocal: dayjsTW,
    antdLocal: antdTW
  },
  'en-US': {
    local: en_US,
    dayjsLocal: dayjsEN,
    antdLocal: antdEN
  }
};

export default messages;
