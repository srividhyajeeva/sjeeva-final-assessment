(function() {
    'use strict';

    angular
        .module('app')
        .controller('TomatoExerciseThreeController', TomatoExerciseThreeController);
    
    TomatoExerciseThreeController.$inject = [
        '$scope', 'restService', '$q'
    ];

    function TomatoExerciseThreeController($scope, restService, $q) {
        var vm = this;

        activate();

        function activate() {
            $q.all([
                getExerciseThreeData()
            ]).then(activateComplete);

            function activateComplete(results) {
                vm.data = results[0];
                console.log(sumOrdersByCountry(vm.data));
                console.log(OrdersByContry(vm.data));
            }
        }

        function getExerciseThreeData() {
            return restService.getExerciseThreeData().then(function(response) {
                return response;
            });
        }

        //Snippet without lodash
        function sumOrdersByCountry(data)
        {
            var countries = data[0].countries;
            var tomatoOrders = data[3].orders;
            var ordersByCountry = {};
            angular.forEach(countries,function(country)
            { 
                var totQty = 0;
                angular.forEach(tomatoOrders,function(order)
                {
                  if(country.ID == order.Countries.ID)
                   totQty = totQty + order.Qty; 
                });
                ordersByCountry[country.Title] = totQty;
            });
            return ordersByCountry;
        }

        //snippet with lodash
        function OrdersByContry(data) 
        {
            var countries = data[0].countries;
            var tomatoes = data[1].tomatoes;
            var statuses = data[2].statuses;
            var tomatoOrders = data[3].orders;
            return _.chain(tomatoOrders)
                .forEach(function(tomatoOrder) 
                {
                    tomatoOrder.Countries = _.find(countries, ['ID', tomatoOrder.Countries.ID]);
                    tomatoOrder.Tomato = _.find(tomatoes, ['ID', tomatoOrder.Tomato.ID]);
                    tomatoOrder.Status = _.find(statuses, ['ID', tomatoOrder.Status.ID])
                })
                .groupBy('Countries.Title')
                .value();
        }
    }
})();
