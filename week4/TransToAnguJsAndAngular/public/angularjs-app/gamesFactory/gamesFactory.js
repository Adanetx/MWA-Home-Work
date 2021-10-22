angular.module("meanGames").factory("GamesFactory", GamesFactory)

function GamesFactory($http) {
    return {
        getAllGames: getAll,
        getOneGame: getOne,
        postGame: postGame,
        deleteGame: deleteOne,
        getCount: getGames,
        searchOne: search,
        postUser: postUser,
        updateOne: updateOne
    }

    function getAll(offset) {
        return $http.get("/api/games?offset=" + offset)
            .then(complete).catch(failed)

    }

    function getGames(count) {
        console.log("count", count);
        return $http.get("/api/games?count=" + count)
            .then(complete).catch(failed)

    }

    function postUser(user) {
        return $http.post("api/users/register", user).then(complete).catch(fetch);
    }

    function getOne(gameId) {
        return $http.get("/api/games/" + gameId)
            .then(complete).catch(failed)
    }

    function postGame(game) {
        return $http.post("api/games/", game).then(complete).catch(fetch);
    }

    function deleteOne(gameId) {
        return $http.delete("api/games/" + gameId).then(complete).catch(failed)
    }

    function search(title) {
        console.log("search by name ", title);
        return $http.get("/api/games/?name=" + title).then(complete).catch(error);
    }


    function updateOne(gameId, game) {
        console.log("the game is  ok ");

        return $http.put("api/games/" + gameId, game).then(complete).catch(fetch);
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