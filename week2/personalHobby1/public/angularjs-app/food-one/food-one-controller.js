angular.module("personalHobby").controller("FoodController", FoodController)


function _getStarRating(stars) {
    return new Array(stars)
}

function FoodController(FoodsFactory, $routeParams) {

    const vm = this
    const id = $routeParams.foodId
    FoodsFactory.getOneFood(id).then(function(response) {
        vm.food = response
        vm.rating = _getStarRating(response.rate)
    })

}