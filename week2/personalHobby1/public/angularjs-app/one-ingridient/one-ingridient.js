angular.module("personalHobby").controller("IngirdientController", IngirdientController)


function _getStarRating(stars) {
    return new Array(stars)
}

function IngirdientController(IngirdientsFactory, $routeParams) {

    const vm = this
    const id = $routeParams.ingirdientId
    IngirdientsFactory.getOneIngirdient(id).then(function(response) {
        vm.ingirdient = response
        vm.rating = _getStarRating(response.rate)
    })

}