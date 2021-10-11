angular.module("personalHobby").controller("IngirdientsController", IngirdientsController)

function IngirdientsController(IngirdientsFactory) {
    const vm = this;
    vm.page = 0;
    vm.options = [2, 4, 6, 8];
    vm.offset = 0;

    vm.isSubmitted = false;


    IngirdientsFactory.getAllIngirdients(vm.offset).then(function(response) {
        console.log("see", response);
        vm.ingirdients = response;
        const ingirdientlength = JSON.parse(JSON.stringify(ingirdients));
        if (ingirdientlength.length < 5) vm.offset = 0;
    });
    vm.previous = function() {
        vm.offset = vm.offset - 5;
        if (vm.offset <= 0) vm.offset = 0;
        IngirdientsFactory.getAllIngirdients(vm.offset).then(function(ingirdients) {
            vm.ingirdients = ingirdients;
        });
    };
    vm.next = function() {
        vm.offset = vm.offset + 5;
        IngirdientsFactory.getAllIngirdients(vm.offset).then(function(ingirdients) {
            vm.ingirdients = ingirdients;
            const ingirdientlength = JSON.parse(JSON.stringify(ingirdients));
            if (ingirdientlength.length < 5) vm.offset = 0;
        });
    };




    vm.addIngirdients = function() {
        const postingirdient = {
            substance: vm.ingirdientSubstance,
            amount: vm.ingirdientAmount,
            catagory: vm.ingirdientCatagory,

        }
        console.log("the new created ingirdient is ", postingirdient)
        if (vm.ingirdientForm.$valid) {
            IngirdientsFactory.postIngirdient(postingirdient).then(function(response) {
                console.log("Ingirdient saved")
                vm.ingirdientSubstance = '';
                vm.ingirdientAmount = '';
                vm.ingirdientCatagory = '';

            }).catch(function(error) {
                console.log(error)
            })
        } else
            vm.isSubmitted = true;
    }

    vm.ingirdientDelete = function(id) {
        console.log("iddddddd", id);

        IngirdientsFactory.deleteIngirdient(id).then(function(response) {

            vm.deleted = true;
            // 

            if (!(response.status)) {
                IngirdientsFactory.getAllIngirdients(vm.offset).then(function(response) {
                    console.log("see", response);
                    vm.ingirdients = response;
                    const ingirdientlength = JSON.parse(JSON.stringify(ingirdients));
                    if (ingirdientlength.length < 5) vm.offset = 0;
                });

            }

        });
    }
    vm.onGetSelect = (inp) => {
        if (inp) {
            count = parseInt(inp);
            console.log("hello ", count)
            IngirdientsFactory.getCount(count).then(function(response) {
                vm.resp = response
                vm.get = 0;
                console.log(response);
            })
            vm.get = 0;

        }
    }
}