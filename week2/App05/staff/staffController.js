angular.module("myPropperApp").controller("StaffController", StaffController)

function StaffController($routeParams, StaffFactory) {
    const vm = this
    const staffId = $routeParams.staffId
    StaffFactory.getOneStaff(staffId)
        .then(function(response) {
            vm.staff = response
        })
}