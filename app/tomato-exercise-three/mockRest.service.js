(function() {
	"use strict";

	angular
		.module("app.shared-services")
		.factory("mockRestService", mockRestService);

	mockRestService.$inject = ["$http", "$q"];

	function mockRestService($http, $q) {

		var service = {
            getListItems: getListItems
		};

		return service;

		function getListItems(listTitle, queryParams) {
            var dfd = $q.defer();
            $http.defaults.headers.post['X-HTTP-Method'] = "";
            var restUrl = "../_api/web/lists/getbytitle('" + listTitle + "')/items" + queryParams;
            $http.get(restUrl).success(function(data) {
                dfd.resolve(data.d.results);
            }).error(function(data) {
                dfd.reject("error, cannot get items"); 
            });
            return dfd.promise;
		}

	}
})();

function getRisksandIssues() {
	var queryParams = {
		Select: 'ID, Title, Function/Title, Description, Item_x0020_Owner/Title',
		expand: 'Function, Item_x0020_Owner',
		filter: 'Risk_x0020_Impact eq High',
		top: 500
	};
	mockRestService.getListItems('Risks and Issues', queryParams).then(function(response) {
		return response;
	});
}

/* ANTICIPATED DATA FORMAT: getRisksandIssues
	{
		ID: 1,
		Title: 'Item title1',
		Function: { Title: 'FuntionTitle'},//lookup value
		Description: 'Item Description1',
		Item Owner : { Title: 'User Name'} //people picker value
	}
*/

function getWorkPlans() {
	var queryParams = {
		select: 'ID, Task_x0020_Owner/Title, Function/Title, Work_x0020_Plan_x0020_Task_x0020_Type/Title, Work_x0020_Plan_x0020_Task_x0020_Status/Title',
		expand: 'TaskOwner, Function, Work_x0020_Plan_x0020_Task_x0020_Type, Work_x0020_Plan_x0020_Task_x0020_Status',
		orderby: 'Due_x0020_Date',
		top: 2000
	}; 
	mockRestService.getListItems('Work Plan', queryParams).then(function(response) {
		return response;
	});
}

/* ANTICIPATED DATA FORMAT: getWorkPlans
	{
		ID: 1,
		Task Owner: { Title: 'User Name'} //people picker value,
		Function: { Title: 'FuntionTitle'},//lookup value
		WorkPlan Task Type: 'Task type1',
		WorkPlan Task Status : { "Task status1"}
	}
*/





























