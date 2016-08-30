import template from "./channels_list.html!text";
import ChannelsListController from "./channels_list.controller";

function channelsListDirective() {
  return {
    restrict: "E",
    replace: true,
    template: template,
    scope: true,
    bindToController: true,
    controllerAs: "ctrl",
    controller: ChannelsListController
  };
}

channelsListDirective.$inject = [];

export default channelsListDirective;
