angular.module("myPropperApp", ["ngRoute"]).config(config)

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "main/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"

    }).when('/about', {
        templateUrl: "./about/about.html",
        controller: "AboutController",
        controllerAs: "aboutCtrl"
    }).when('/staff', {
        templateUrl: "./staffs/staffs.html",
        controller: "StaffsController",
        controllerAs: "staffsCtrl"
    }).when('/staff/:staffId', {
        templateUrl: "./staff/staff.html",
        controller: "StaffController",
        controllerAs: "staffCtrl"
    }).otherwise({
        redirectTo: "/"
    })
}