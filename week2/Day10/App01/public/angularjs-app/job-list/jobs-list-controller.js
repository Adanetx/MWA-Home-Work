angular.module("myApp").controller("JobsController", JobsController)

function JobsController(JobsFactory) {
    const vm = this;
    vm.page = 0;
    vm.options = [2, 4, 6, 8];
    vm.offset = 0;

    vm.isSubmitted = false;


    JobsFactory.getAllJobs(vm.offset).then(function(response) {
        console.log("see", response);
        vm.jobs = response;
        const joblength = JSON.parse(JSON.stringify(jobs));
        if (joblength.length < 5) vm.offset = 0;
    });
    vm.previous = function() {
        vm.offset = vm.offset - 5;
        if (vm.offset <= 0) vm.offset = 0;
        JobsFactory.getAllJobs(vm.offset).then(function(jobs) {
            vm.jobs = jobs;
        });
    };
    vm.next = function() {
        vm.offset = vm.offset + 5;
        JobsFactory.getAllJobs(vm.offset).then(function(jobs) {
            vm.jobs = jobs;
            const joblength = JSON.parse(JSON.stringify(jobs));
            if (joblength.length < 5) vm.offset = 0;
        });
    };




    vm.addJobs = function() {
        const postjob = {
            title: vm.jobTitle,
            salary: vm.jobSalary,
            description: vm.jobDescription,
            skill: vm.jobSkill
        }
        console.log("the new created job is ", postjob)
        if (vm.jobForm.$valid) {
            JobsFactory.postJob(postjob).then(function(response) {
                console.log("Job saved")
                vm.jobTitle = '';
                vm.jobSalary = '';
                vm.jobDescription = '';
                vm.jobSkill = '';
            }).catch(function(error) {
                console.log(error)
            })
        } else
            vm.isSubmitted = true;
    }

    vm.jobDelete = function(id) {
        console.log("iddddddd", id);

        JobsFactory.deleteJob(id).then(function(response) {

            vm.deleted = true;

        });
    }
    vm.onGetSelect = (inp) => {
        if (inp) {
            count = parseInt(inp);
            console.log("hhhjjjjjjjjjj", count)
            JobsFactory.getCount(count).then(function(response) {
                vm.resp = response
                vm.get = 0;
                console.log(response);
            })
            vm.get = 0;

        }
    }
}