angular.module("myPropperApp").factory("StaffFactory", StaffFactory)

function StaffFactory($http) {
    return {
        getAllStaffs: getAll,
        getOneStaff: getOne
    }

    function getAll() {
        return $http.get("https://jsonplaceholder.typicode.com/users")
            .then(complete).catch(failed)
    }

    function getOne(staffId) {
        return $http.get("https://jsonplaceholder.typicode.com/users/" + staffId)
            .then(complete).catch(failed)
    }


    function complete(response) {
        return response.data

    }

    function failed(error) {
        return error
    }
}