(function() {
    'use strict';

    angular
        .module('app')
        .controller('TomatoAnnouncementsController', TomatoAnnouncementsController);
    
    TomatoAnnouncementsController.$inject = [
        '$scope', 'restService', '$q', 'tomatoAnnouncementsFeedService'
    ];

    function TomatoAnnouncementsController($scope, restService, $q, tomatoAnnouncementsFeedService) {
        var vm = this;
        vm.loading = true;
        vm.types = [];

        $q.all([
            getAnnouncements(),
            getAnnouncementOwners()
        ]).then(activateComplete);

        function activateComplete(results) {
            var formattedDate = tomatoAnnouncementsFeedService.formatDate(results[0]);
            vm.announcements = tomatoAnnouncementsFeedService.mapOwnersandAnnouncements(formattedDate, results[1]);
            getTypes(results[0]);
            vm.loading = false;
        }
        function getTypes(data) {
            vm.types = _.chain(data).map('Type.Title').uniq().value();
         } 
        function getAnnouncements() {
            return restService.getAnnouncements().then(function(announcements) {
                return announcements;
            });
        }
        function getAnnouncementOwners() {
            return restService.getAnnouncementOwners().then(function(owners) {
                return owners;
            });
       }
    }
})();