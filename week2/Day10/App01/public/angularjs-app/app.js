angular.module("myApp", ["ngRoute"]).config(config)

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/main/welcome.html",

    }).when("/jobs", {
        templateUrl: "angularjs-app/job-list/jobs.html",
        controller: "JobsController",
        controllerAs: "vm"
    }).when("/jobs/:jobId", {
        templateUrl: "angularjs-app/job-one/job.html",
        controller: "JobController",
        controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    })
}