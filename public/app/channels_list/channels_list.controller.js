import Auth from "../auth";

class ChannelsListController {

  constructor(WebSocket) {
    this.channels = [];
    this.WebSocket = WebSocket;

    this.register();
  }

  register() {
    this.WebSocket.on('new_connection', (data) => {
      this.handleChannels(data.channels);
    });

    this.WebSocket.on('new_channel', (data) => {
        this.channels.push(data);
    });
  }

  handleChannels(channels) {
    this.channels = channels;
  }

  joinChannel(channel) {
    Auth.setCurrentChannel(channel);
  }

}

ChannelsListController.$inject = ["WebSocket"];

export default ChannelsListController;