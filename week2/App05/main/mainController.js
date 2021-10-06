angular.module("myPropperApp").controller("MainController", MainController)

function MainController(PostFactory){
    const vm = this

    PostFactory.get("https://jsonplaceholder.typicode.com/posts")
        .then(function(response){
            vm.jokes = response.data
        })
}