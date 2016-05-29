var app = angular.module('myApp', ['ui.grid']);

app.controller('customersCtrl', function($scope) {


	$scope.gridOptions = {
		columnDefs: [
      		{ field: 'delete', width: 35, headerCellTemplate: '<div style="height:0px;"></div>', cellTemplate: 
      			'<button class="btn btn-link" ng-click="grid.appScope.deleteRow(row)"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>' },
      		{ field: 'address', headerCellTemplate: '<div style="height:0px;"></div>',}],
  		data: []
	};

	chrome.storage.sync.get('urlList', function (results) {
		if (results.urlList)
		{
			$scope.gridOptions.data = results.urlList;
			$scope.$apply();
		}
	});

	$scope.addURL = function() {
		chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs){
			var newUrl = {};
			newUrl.address = tabs[0].url;
			$scope.gridOptions.data.push(newUrl);
			$scope.$apply();
		});
	}

	$scope.expand = function() {
		var arrayLength = $scope.gridOptions.data.length;

		for(var i = 0; i < arrayLength; i++)
		{
			var createProperties = {};
			createProperties.url = $scope.gridOptions.data[i].address;
			chrome.tabs.create(createProperties);
		}
	}

	$scope.saveList = function() {
		chrome.storage.sync.set({'urlList': $scope.gridOptions.data});
	}

	$scope.clearList = function() {
		$scope.gridOptions.data = [];
	}

	$scope.deleteRow = function(row) {
    	var index = $scope.gridOptions.data.indexOf(row.entity);
    	$scope.gridOptions.data.splice(index, 1);
  	};
});