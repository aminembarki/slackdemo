import Auth from "../auth";

class SidebarController {

    constructor($http){
        this.$http = $http;
        this.isNewChannelFormOpen = false;
    }

    currentUser() {
        return Auth.getCurrentUser();
    }

    newChannel(channelname) {
        let params = {
            channelname: channelname,
            created_at: new Date().toISOString(),
            user_id: Auth.getCurrentUser().id
        };


        this.$http.post("/addchannel", params).then(
            () => {
            this.channelname = "";
            },
            (reason) => {
                console.log("error", reason);
            }
        );
    }
}

SidebarController.$inject = ["$http"];

export default SidebarController;
