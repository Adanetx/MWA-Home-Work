angular.module("myPropperApp").controller("MainController", MainController)

function MainController(StaffFactory) {
    const vm = this

    StaffFactory.get("https://jsonplaceholder.typicode.com/staffs")
        .then(function(response) {
            vm.jokes = response.data
        })
}