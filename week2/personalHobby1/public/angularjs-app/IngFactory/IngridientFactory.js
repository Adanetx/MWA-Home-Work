angular.module("personalHobby").factory("IngridientsFactory", IngridientsFactory)

function IngridientsFactory($http) {
    return {
        getAllIngridients: getAll,
        getOneIngridient: getOne,
        postIngridient: postIngridient,
        deleteIngridient: deleteOne,
        getCount: getIngridients
    }

    function getAll(offset) {
        return $http.get("/api/foods/:foodId/ingridients?offset=" + offset)
            .then(complete).catch(failed)

    }

    function getIngridients(count) {
        console.log("count", count);
        return $http.get("/api/foods/:foodId/ingridients?count=" + count)
            .then(complete).catch(failed)

    }

    function getOne(ingridientId) {
        return $http.get("/api/foods/:foodId/ingridients/" + ingridientId)
            .then(complete).catch(failed)
    }

    function postIngridient(ingridient) {
        return $http.post("/api/foods/:foodId/ingridients/", ingridient).then(complete).catch(fetch);
    }

    function deleteOne(ingridientId) {
        return $http.delete("/api/foods/:foodId/ingridients/" + ingridientId).then(complete).catch(failed)
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