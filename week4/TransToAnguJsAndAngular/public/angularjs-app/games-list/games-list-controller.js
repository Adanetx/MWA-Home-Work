angular.module("meanGames").controller("GamesController", GamesController)

function GamesController(GamesFactory) {
    const vm = this;
    vm.page = 0;
    vm.options = [2, 4, 6, 8];
    vm.offset = 0;

    vm.isSubmitted = false;


    GamesFactory.getAllGames(vm.offset).then(function(response) {
        console.log("see", response);
        vm.games = response;
        const gamelength = JSON.parse(JSON.stringify(vm.games));
        if (gamelength.length < 5) vm.offset = 0;
    });
    vm.previous = function() {
        vm.offset = vm.offset - 5;
        if (vm.offset <= 0) vm.offset = 0;
        GamesFactory.getAllGames(vm.offset).then(function(games) {
            vm.games = games;
        });
    };
    vm.next = function() {
        vm.offset = vm.offset + 5;
        GamesFactory.getAllGames(vm.offset).then(function(games) {
            vm.games = games;
            const gamelength = JSON.parse(JSON.stringify(games));
            if (gamelength.length < 5) vm.offset = 0;
        });
    };




    vm.addGames = function() {
        const postgame = {
            title: vm.gameTitle,
            year: vm.gameYear,
            price: vm.gamePrice,
            minPlayers: vm.gameMinPlayers,
            maxPlayers: vm.gameMaxPlayers,
            rate: vm.gameRate

        }
        console.log("the new created game is ", postgame)
        if (vm.gameForm.$valid) {
            GamesFactory.postGame(postgame).then(function(response) {
                console.log("Game saved")
                vm.gameTitle = '';
                vm.gameYear = '';
                vm.gamePrice = '';
                vm.gameMinPlayers = '';
                vm.gameMaxPlayers = '';
                vm.gameRate = '';
            }).catch(function(error) {
                console.log(error)
            })
        } else
            vm.isSubmitted = true;
    }

    vm.gameDelete = function(id) {
        console.log("deleted", id);

        GamesFactory.deleteGame(id).then(function(response) {

            vm.deleted = true;
            // 

            if (!(response.status)) {
                $window.location.hrf = "#!games"
                if (vm.offset - 5 >= 0) {
                    vm.offset -= 5;
                }
                GamesFactory.getAllGames(vm.offset).then(function(response) {
                    console.log("see", response);
                    vm.games = response;
                    const gamelength = JSON.parse(JSON.stringify(games));
                    if (gamelength.length < 5) vm.offset = 0;
                    else {
                        vm.offset += 5;
                    }
                });

            }

        });
    }
    vm.onGetSelect = (inp) => {
        if (inp) {
            count = parseInt(inp);
            console.log("hello ", count)
            GamesFactory.getCount(count).then(function(response) {
                vm.resp = response
                vm.get = 0;
                console.log(response);
            })
            vm.get = 0;

        }
    }
    vm.search = () => {
        if (vm.title) {
            GamesFactory.searchOne(vm.title).then(function(response) {
                console.log("the response is ", response);
                if (!response.data) {
                    console.log("there is no data");
                    vm.nodataFound = true;
                } else {
                    vm.games = response.data
                    vm.searchExist - true;
                    vm.nodataFound = false;
                    console.log("the gamesare ", response.data);
                }
            })
        } else {
            vm.searchedNameEmpty = true;
        }
    }
}