export default {
  data() {
    return {
      webSocket: null,
      heartCheck: null,
      lockReconnect: false,
      tt: null
    };
  },
  created() {
    this.heartCheck = {
      // timeout: this.websockeTimeout,
      intervalObj: null,
      start: function(ws) {
        this.intervalObj && clearInterval(this.intervalObj);
        this.intervalObj = setInterval(() => {
          if (ws && ws.readyState === 1) {
            ws.send("ping");
          } else {
            clearInterval(this.intervalObj);
            this.intervalObj = null;
          }
        }, 50000);
      }
    };
  },
  methods: {
    /**
     * 初始化websocket
     */
    initWebSocket(websocketUrl) {
      this.destroyWebsocket();
      try {
        this.webSocket = new WebSocket(websocketUrl);
        this.webSocket.onopen = event => {
          this.onOpen(event);
          this.heartCheck.start(this.webSocket);
        };
        this.webSocket.onerror = () => {
          this.$message.warning( "网络onerror，正在尝试重新连接，请稍后!");
          this.reconnect(websocketUrl);
        };
        this.webSocket.onclose = () => {
          this.$message.warning("网络onclose，正在尝试重新连接，请稍后!");
          this.reconnect(websocketUrl);
        };
        this.webSocket.onmessage = event => {
          this.onMessage(event);
        };
      } catch (error) {
        console.log(error.message);
        this.reconnect(websocketUrl);
      }
    },
    onOpen(event) {
      console.log(event, "onOpen...");
    },
    onError(event) {
      console.log(event, "onError...");
    },
    destroyWebsocket() {
      if (this.webSocket) {
        this.webSocket.onclose = () => {
          console.log("关闭");
        };
        this.webSocket.close();
        this.webSocket = null;
      }
    },
    reconnect(websocketUrl) {
      if (this.lockReconnect) {
        return;
      }
      this.lockReconnect = true;
      this.tt && clearTimeout(this.tt);
      this.tt = setTimeout(() => {
        this.initWebSocket(websocketUrl);
        this.lockReconnect = false;
      }, 5000);
    }
  },
  destroyed() {
    this.destroyWebsocket();
  }
};
