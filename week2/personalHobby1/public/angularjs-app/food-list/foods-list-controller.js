angular.module("personalHobby").controller("FoodsController", FoodsController)

function FoodsController(FoodsFactory) {
    const vm = this;
    vm.page = 0;
    vm.options = [2, 4, 6, 8];
    vm.offset = 0;

    vm.isSubmitted = false;


    FoodsFactory.getAllFoods(vm.offset).then(function(response) {
        console.log("see", response);
        vm.foods = response;
        const foodlength = JSON.parse(JSON.stringify(foods));
        if (foodlength.length < 5) vm.offset = 0;
    });
    vm.previous = function() {
        vm.offset = vm.offset - 5;
        if (vm.offset <= 0) vm.offset = 0;
        FoodsFactory.getAllFoods(vm.offset).then(function(foods) {
            vm.foods = foods;
        });
    };
    vm.next = function() {
        vm.offset = vm.offset + 5;
        FoodsFactory.getAllFoods(vm.offset).then(function(foods) {
            vm.foods = foods;
            const foodlength = JSON.parse(JSON.stringify(foods));
            if (foodlength.length < 5) vm.offset = 0;
        });
    };




    vm.addFoods = function() {
        const postfood = {
            name: vm.foodName,
            calory: vm.foodCalory,
            origin: vm.foodOrigin,

        }
        console.log("the new created food is ", postfood)
        if (vm.foodForm.$valid) {
            FoodsFactory.postFood(postfood).then(function(response) {
                console.log("Food saved")
                vm.foodName = '';
                vm.foodCalory = '';
                vm.foodOrigin = '';
                vm.foodSkill = '';
            }).catch(function(error) {
                console.log(error)
            })
        } else
            vm.isSubmitted = true;
    }

    vm.foodDelete = function(id) {
        console.log("iddddddd", id);

        FoodsFactory.deleteFood(id).then(function(response) {

            vm.deleted = true;
            // 

            if (!(response.status)) {
                FoodsFactory.getAllFoods(vm.offset).then(function(response) {
                    console.log("see", response);
                    vm.foods = response;
                    const foodlength = JSON.parse(JSON.stringify(foods));
                    if (foodlength.length < 5) vm.offset = 0;
                });

            }

        });
    }
    vm.onGetSelect = (inp) => {
        if (inp) {
            count = parseInt(inp);
            console.log("hello ", count)
            FoodsFactory.getCount(count).then(function(response) {
                vm.resp = response
                vm.get = 0;
                console.log(response);
            })
            vm.get = 0;

        }
    }
}