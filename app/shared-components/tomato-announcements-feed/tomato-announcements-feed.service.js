(function() {
	"use strict";

	angular
		.module("app")
		.factory("tomatoAnnouncementsFeedService", tomatoAnnouncementsFeedService);

	tomatoAnnouncementsFeedService.$inject = ["restService"];

	function tomatoAnnouncementsFeedService(restService) {
		var service = {
            mapOwnersandAnnouncements: mapOwnersandAnnouncements,
            formatDate: formatDate
		};

		return service;
        
        //snippet to map the owners and announcement
        function mapOwnersandAnnouncements(announcements, owners) 
        {
            return angular.forEach(announcements,function(announcement)
            {
                angular.forEach(owners,function(owner)
                {
                    if(owner.ID == announcement.OwnerID) announcement.Owner = owner; 
                }); 
            });
        }

        //sinppet for date format and filter as requested
        function formatDate(announcements) 
        {
            return angular.forEach(announcements, function(announcement)
            {
               announcement.Date = {
                   'displayDate' : moment(announcement.Date).format('MMM. DD, YYYY'),
                   'orderDate' : moment(announcement.Date).format('YYYY-MM-DD')
               }
            });
        }
	}
})();