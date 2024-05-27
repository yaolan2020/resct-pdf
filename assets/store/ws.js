import { makeAutoObservable } from 'mobx';
import WSTools from 'utils/wsTools.js';

class WS {
  // 在线人数
  onlineNum = 0;
  constructor() {
    makeAutoObservable(this);
  }

  setOnlineNum(num) {
    this.onlineNum = num;
  }

  receiveMsgData() {
    const ws = WSTools.getClient();
    ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      if (data.msgType === 'online') {
        this.setOnlineNum(data.msgData);
      }
    };
  }
}

const ws = new WS();

export default ws;
