angular.module("myPropperApp", ["ngRoute"]).config(config)

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "main/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"

    }).when('/about', {
        templateUrl: "./about/about.html",
        controller: "AboutController",
        controllerAs: "aboutCtrl"
    }).when('/staff', {
        templateUrl: "./posts/posts.html",
        controller: "PostsController",
        controllerAs: "postsCtrl"
    }).when('/staff/:postId', {
        templateUrl: "./post/post.html",
        controller: "PostController",
        controllerAs: "postCtrl"
    }).otherwise({
        redirectTo: "/"
    })
}