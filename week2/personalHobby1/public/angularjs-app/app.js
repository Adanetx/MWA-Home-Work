angular.module("personalHobby", ["ngRoute"]).config(config)

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/main/welcome.html",

    }).when("/foods", {
        templateUrl: "angularjs-app/food-list/foods.html",
        controller: "FoodsController",
        controllerAs: "vm"
    }).when("/foods/:foodId", {
        templateUrl: "angularjs-app/food-one/food.html",
        controller: "FoodController",
        controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    })
}