angular.module("meanGames").controller("RegisterController", RegisterController)

function RegisterController(GamesFactory) {
    var vm = this;
    vm.register = function($http) {
        var user = {
            username: vm.username,
            password: vm.password,

        }
        if (!vm.username || vm.password) {
            vm.err = "please add a user and password"
        } else {
            if (vm.password !== vm.passwordRepeat) {
                vm.err = "please make sure the password match"
            } else {
                GamesFactory.postUser(user).then(function(result) {
                    vm.username = ""
                    vm.passwor = ""
                    console.log("result ", result);
                    vm.message = "success full registration please login"
                }).catch(function(err) {
                    console.log(err);
                })
            }
        }
    }
}