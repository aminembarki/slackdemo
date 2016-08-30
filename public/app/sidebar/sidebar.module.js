import sidebarDirective from './sidebar.directive';
import submitChannelOnReturnDirective from './submit_form_on_return.directive';

export default angular.module('Sidebar', [])
  .directive('sidebar', sidebarDirective)
    .directive('submitFormOnReturn', submitChannelOnReturnDirective);
