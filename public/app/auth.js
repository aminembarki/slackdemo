export default class Auth {

  static setCurrentUser(user) {
    this.currentUser = user;
  }

  static getCurrentUser() {
    return this.currentUser;
  }

  static setCurrentChannel(channel) {
    this.currentChannel = channel;
  }

  static getCurrentChannel() {
    return this.currentChannel;
  }
}