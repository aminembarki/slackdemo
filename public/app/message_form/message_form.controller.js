import Auth from "../auth";

class MessageFormController {

  constructor($http) {
    this.$http = $http;
  }

  sendMessage(message) {
   var route = "/messages";
   var destination = Auth.getCurrentChannel().destination;
		if(window.location.hash.length === 21) {
			destination = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
			route = "/chats";
			// hash found
		}

    let params = {
      message:    message,
      created_at: new Date().toISOString(),
      user_id:    Auth.getCurrentUser().id,
      destination:   destination ,
      private:    Auth.getCurrentChannel().private
    };

    this.$http.post(route, params).then(
      () => {
        this.message = "";
      },
      (reason) => {
        console.log("error", reason);
      }
    );

  }

}

MessageFormController.$inject = ["$http"];

export default MessageFormController;