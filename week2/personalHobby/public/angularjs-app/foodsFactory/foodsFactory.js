angular.module("personalHobby").factory("FoodsFactory", FoodsFactory)

function FoodsFactory($http) {
    return {
        getAllFoods: getAll,
        getOneFood: getOne
    }

    function getAll() {
        return $http.get("/api/foods")
            .then(complete).catch(failed)

    }

    function getOne(foodId) {
        return $http.get("/api/foods/" + foodId)
            .then(complete).catch(failed)
    }

    function complete(response) {
        console.log("got response");
        return response.data;
    }

    function failed(error) {
        console.log(error);
        return error
    }
}