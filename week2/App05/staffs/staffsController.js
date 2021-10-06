angular.module("myPropperApp").controller("StaffsController", StaffsController)

function StaffsController(StaffFactory) {
    const vm = this
    console.log("hhhhhhhhhhh");
    StaffFactory.getAllStaffs().then(function(response) {
        vm.staffs = response;
    })


}