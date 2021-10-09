angular.module("personalHobby").controller("FoodsController", FoodsController)

function FoodsController(FoodsFactory) {
    const vm = this

    FoodsFactory.getAllFoods().then(function(foods) {
        vm.foods = foods
    })
}