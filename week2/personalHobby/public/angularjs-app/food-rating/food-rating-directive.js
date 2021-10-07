angular.module("personalHobby").directive("foodRating", FoodRating)

function FoodRating() {
    return {
        restrict: "E", //EACM
        templateUrl: "angularjs-app/food-rating/rating.html",
        bindToController: true,
        controller: "FoodController",
        controllerAs: "vm"
    }
}