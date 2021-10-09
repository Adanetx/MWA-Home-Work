angular.module("myApp").factory("JobsFactory", JobsFactory)

function JobsFactory($http) {
    return {
        getAllJobs: getAll,
        getOneJob: getOne,
        postJob: postJob,
        deleteJob: deleteOne,
        getCount: getJobs
    }

    function getAll(offset) {
        return $http.get("/api/jobs?offset=" + offset)
            .then(complete).catch(failed)

    }

    function getJobs(count) {
        console.log("raymond", count);
        return $http.get("/api/jobs?count=" + count)
            .then(complete).catch(failed)

    }

    function getOne(jobId) {
        return $http.get("/api/jobs/" + jobId)
            .then(complete).catch(failed)
    }

    function postJob(job) {
        return $http.post("api/jobs/", job).then(complete).catch(fetch);
    }

    function deleteOne(jobId) {
        return $http.delete("api/jobs/" + jobId).then(complete).catch(failed)
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