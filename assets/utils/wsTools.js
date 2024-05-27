import ReconnectingWebSocket from 'reconnecting-websocket';
import authUtils from 'utils/authUtils';

const WSTools = (function () {
  var ws = null;
  return {
    sleep: function (millis) {
      for (var t = Date.now(); Date.now() - t <= millis; );
    },
    connect: function () {
      let tokenId = authUtils.getTokenId();
      var url = `${globalConfig.wsUrl}/${tokenId}`;
      if (url && ws == null) {
        ws = new ReconnectingWebSocket(url, null, {
          minReconnectionDelay: 30000,
          maxReconnectionDelay: 30000,
          maxRetries: 10
        });
        ws.onopen = function () {
          console.log('Info: connection opened.');
        };
        ws.onclose = function (event) {
          ws = null;
          console.log('Info: connection closed：{}', event);
        };
      }
    },

    disconnect: function () {
      if (ws != null) {
        ws.close();
        ws = null;
      }
    },

    getClient: function () {
      if (!ws) {
        this.connect();
      }
      return ws;
    },

    sendText: function (msg) {
      ws.send(msg);
    }
  };
})();

export default WSTools;

/*
 * 接收
ws.onmessage = function (evt) {
	var data = JSON.parse(evt.data);
};

 */
