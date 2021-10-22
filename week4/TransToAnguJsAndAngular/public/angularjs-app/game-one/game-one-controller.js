angular.module("meanGames").controller("GameController", GameController)


function _getStarRating(stars) {
    return new Array(stars)
}

function GameController(GamesFactory, $routeParams, $window) {

    const vm = this
    const id = $routeParams.gameId
    GamesFactory.getOneGame(id).then(function(response) {
        vm.game = response
        vm.rating = _getStarRating(response.rate)
    })
    vm.showForm = function() {
        vm.updateFlag = true;
    }

    vm.updateGame = function() {
        const gameId = $routeParams.gameId;
        const updatedValue = {
            title: vm.gameTitle,
            year: vm.gameYear,
            price: vm.gamePrice,
            minPlayers: vm.gameMinPlayers,
            maxPlayers: vm.gameMaxPlayers,
            rate: vm.gameRate
        }
        GamesFactory.updateOne(gameId, updatedValue).then(function(response) {
            console.log(" the Id is ", gameId);
            console.log("the upadtate value is ", updatedValue);
            if (!(response.status)) {
                $window.location.href = "#!/games"
            } else {
                console.log("there is  error on update ");
            }
        })
    }

}