angular.module("personalHobby").factory("FoodsFactory", FoodsFactory)

function FoodsFactory($http) {
    return {
        getAllFoods: getAll,
        getOneFood: getOne,
        postFood: postFood,
        deleteFood: deleteOne,
        getCount: getFoods
    }

    function getAll(offset) {
        return $http.get("/api/foods?offset=" + offset)
            .then(complete).catch(failed)

    }

    function getFoods(count) {
        console.log("count", count);
        return $http.get("/api/foods?count=" + count)
            .then(complete).catch(failed)

    }

    function getOne(foodId) {
        return $http.get("/api/foods/" + foodId)
            .then(complete).catch(failed)
    }

    function postFood(food) {
        return $http.post("api/foods/", food).then(complete).catch(fetch);
    }

    function deleteOne(foodId) {
        return $http.delete("api/foods/" + foodId).then(complete).catch(failed)
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