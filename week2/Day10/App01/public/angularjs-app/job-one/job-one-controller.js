angular.module("myApp").controller("JobController", JobController)


function _getStarRating(stars) {
    return new Array(stars)
}

function JobController(JobsFactory, $routeParams) {

    const vm = this
    const id = $routeParams.jobId
    JobsFactory.getOneJob(id).then(function(response) {
        vm.job = response
        vm.rating = _getStarRating(response.rate)
    })

}