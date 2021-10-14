angular.module("personalHobby").factory("FoodsFactory", FoodsFactory)

function FoodsFactory($http) {
    return {
        getAllFoods: getAll,
        getOneFood: getOne,
        postFood: postFood,
        deleteFood: deleteOne,
        getCount: getFoods,
        searchOne: search,
        postUser: postUser
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

    function postUser(user) {
        return $http.post("api/users/register", user).then(complete).catch(fetch);
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

    function search(name) {
        console.log("search by name ", name);
        return $http.get("/api/foods/?name=" + name).then(complete).catch(error);
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