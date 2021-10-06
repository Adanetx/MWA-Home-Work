angular.module("myPropperApp").controller("MainController", MainController)

function MainController(PostFactory) {
    const vm = this

    PostFactory.get("https://jsonplaceholder.typicode.com/staffs")
        .then(function(response) {
            vm.jokes = response.data
        })
}