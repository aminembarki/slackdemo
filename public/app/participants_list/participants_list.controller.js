import Auth from "../auth";
import _ from "underscore";

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

        this.WebSocket.on('incoming_message', (data) => {
            this.handleIncomingMessageNofitication(data);
        });
  }

	handleIncomingMessageNofitication(data) {
	    if(data.user.id != Auth.getCurrentUser().id){
		   var participant =  _.findWhere ( this.participants , { id : data.user.id } );
		    if (participant) {
			    participant.notification = participant.notification + 1;
		    }
	    }
	}
      handleNewConnection(participants) {
        this.participants = participants;
      }

    privateChat(participant) {
            participant.destination = participant.id;
	        participant.notification = 0;
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