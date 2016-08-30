import Auth from "../auth";

class MessageListController {

  constructor(WebSocket) {
    this.messages = [];

    this.WebSocket = WebSocket;

    this.register();
  }

  register() {
    this.WebSocket.on('incoming_message', (data) => {
      this.handleIncomingMessage(data);
      console.log( this.messages);
    });

    this.WebSocket.on('new_connection', (data) => {
      this.handleNewConnection(data);
    });


  }

  currentChannel() {
    return Auth.getCurrentChannel();
  }


  handleIncomingMessage(data) {
    this.messages.push({ message: data.message, user: data.user, destination:data.destination, channel: data.channel, created_at: data.created_at, type: "message" });
  }


  handleNewConnection(data) {
    if (Auth.getCurrentUser()) {
      this.messages.push({ message: `User ${data.user.name} joined`, name: "System", created_at: data.created_at, type: "notification" });
    } else {
      this.messages = data.messages;
    }
  }

}

MessageListController.$inject = ["WebSocket"];

export default MessageListController;
