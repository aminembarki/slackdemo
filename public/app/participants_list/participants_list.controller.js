import Auth from "../auth";

class ParticipantsListController {

  constructor(WebSocket) {
    this.participants = [];
    this.WebSocket = WebSocket;

    this.register();
  }

    currentUser() {
        return Auth.getCurrentUser();
    }

  register() {
        this.WebSocket.on('new_connection', (data) => {
          this.handleNewConnection(data.participants);
        });
        this.WebSocket.on('user_disconnected', data => this.handleUserDisconnected(data));

  }

      handleNewConnection(participants) {
        this.participants = participants;
      }

    privateChat(participant) {
            participant.destination = [participant.id, Auth.getCurrentUser().id].sort().join('');
            Auth.setCurrentChannel(participant);
    }

    handleUserDisconnected(data) {
        console.log(this.participants);
        this.participants = this.participants.filter(function (part) {
            return  part.id != data.user.id;
        });
    }

}

ParticipantsListController.$inject = ["WebSocket"];

export default ParticipantsListController;