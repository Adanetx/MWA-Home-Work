angular.module("myPropperApp").controller("PostController", PostController)

function PostController($routeParams, PostFactory) {
    const vm = this
    const staffId = $routeParams.staffId
    PostFactory.getOnePost(staffId)
        .then(function(response) {
            vm.staff = response
        })
}