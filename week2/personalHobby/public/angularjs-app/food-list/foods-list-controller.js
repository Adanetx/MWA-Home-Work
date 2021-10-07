angular.module("personalHobby").controller("FoodsController", FoodsController)

function FoodsController(FoodsFactory) {
    const vm = this
    vm.title = ""
    FoodsFactory.getAllFoods().then(function(foods) {
        vm.foods = foods
    })
}