var app = angular.module('myApp', []);

app.controller('customersCtrl', function($scope) {

	$scope.links = [];

	chrome.storage.local.get('urlList', function (results) {
		if (results.urlList)
		{
			$scope.links = results.urlList;
			$scope.$apply();
		}
	});

	$scope.addURL = function()
	{
		chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs){
			var newUrl = {};
			newUrl.address = tabs[0].url;
			$scope.links.push(newUrl);
			$scope.$apply();
		});
	}

	$scope.expand = function()
	{
		var arrayLength = $scope.links.length;

		for(var i = 0; i < arrayLength; i++)
		{
			var createProperties = {};
			createProperties.url = $scope.links[i].address;
			chrome.tabs.create(createProperties);
		}
	}

	$scope.saveList = function()
	{
		chrome.storage.local.set({'urlList': $scope.links});
	}

	$scope.clearList = function()
	{
		$scope.links = [];
	}
});