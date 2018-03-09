(function() {
    'use strict';
 
    angular
        .module('app')
        .directive('tomatoAnnouncementsFeed', tomatoAnnouncementsFeed);
 
    function tomatoAnnouncementsFeed() {
        var directive = {
            scope: {
                announcements: '<',
                types: '<'
            },
            restrict: 'E',
            controller: TomatoAnnouncementsFeedController,
            bindToController: true,
            controllerAs: 'vm',
            templateUrl: './app/shared-components/tomato-announcements-feed/tomato-announcements-feed.directive.html'
        };
 
        return directive;
    }
 
    TomatoAnnouncementsFeedController.$inject = [];
 
    function TomatoAnnouncementsFeedController() {
        var vm = this;
        vm.loading = true;
    }
 })();