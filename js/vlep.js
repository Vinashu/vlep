////////////////////////////////////////////////////////
function Student(data){
    this.hold = false;
    this.proposed = false;
    this.id = data.id;
    this.name = data.name;
    this.userName = data.userName;
    this.surName = data.surName;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.gender = data.gender;
    this.studentID = data.studentID;
    this.faculty = data.faculty;
    this.status = data.status;
    this.major = data.major;
    this.country = data.country;
    this.teach = [];
    this.learn = [];
    this.social = [];
    this.holding = [];
    this.candidate = [];    
    this.addCandidate = function(candidate){
        if(Array.isArray(candidate)){
            this.candidate = this.candidate.concat(candidate);
        } else if(candidate != "" && !candidate){
            this.candidate.push(candidate);
        }
    }
    this.addTeach = function(teach){
        if(Array.isArray(teach)){
            this.teach = this.teach.concat(teach);
        } else if(teach != "" && !teach){
            this.teach.push(teach);
        }
    }
    this.addTeach(data.teach);
    this.addLearn = function(learn){
        if(Array.isArray(learn)){
            this.learn = this.learn.concat(learn);
        } else if(learn != "" && !learn){
            this.learn.push(learn);
        }
    }
    this.addLearn(data.learn);
    this.addSocial = function(social){
        if(Array.isArray(social)){
            this.social = this.social.concat(social);
        } else if(social != "" && !social){
            this.learn.push(social);
        }
    }
    this.addSocial(data.social);    
    this.addHold = function(proposed){
        if(Array.isArray(proposed)){
            this.holding = this.holding.concat(proposed);
        } else if(proposed){
            this.holding.push(proposed);
        }
    }
    this.takeDecision = function(){
        var firstOption = this.holding.shift();
        var secondOption = this.holding.shift();
        if(this.candidate.indexOf(firstOption) < this.candidate.indexOf(secondOption)){
            this.addHold(firstOption);
            secondOption.proposed = false;
            //console.log(this.name + " will hold " + firstOption.name + " and declined " + secondOption.name);
            this.removeCandidate(secondOption);
            secondOption.removeCandidate(this);
        } else {
            this.addHold(secondOption);
            firstOption.proposed = false;
            //console.log(this.name + " will hold " + secondOption.name + " and declined " + firstOption.name);
            this.removeCandidate(firstOption);
            firstOption.removeCandidate(this);
        }
    }
    this.removeCandidate = function(candidate){
        var position = this.candidate.indexOf(candidate);
        this.candidate.splice(position,1);
    }
    this.removeLowerThan = function(candidate){
        var position = this.candidate.indexOf(candidate);
        var qtd = this.candidate.length;
        if(position != (qtd-1) && position != -1) {
            for(var i = qtd - 1; i > position; i--) {
                var remove = this.candidate.pop();
                remove.removeCandidate(this);
            }
        }
    }
    this.printCandidateList = function(){
        var nameList = [];
        this.candidate.forEach(candidate => {
            nameList.push(candidate.name);
        })
        console.log(this.name + " => " + nameList.join(", "));
    }
}

////////////////////////////////////////////////////////
var vlep = angular.module("vlep", ["ngAnimate"]);
vlep.controller("vlepCtrl", function ($scope, $http) {
    console.log("Script loaded...");
    $scope.getStudents = function (fileName) {
        console.log("Entering getStudents");
        $http.get("php/getStudents.php?file=" + fileName)
            .success(function(data, status, headers, config) {
                if (data != null){
                    //$scope.students = data;
                    $scope.students = [];
                    data.forEach(function(item){
                        var student = new Student(item);
                        $scope.students.push(student);
                    });
                }
                console.log(data, status); 
                console.log($scope.students);                                      
            })
            .error(function(data, status, headers, config) {
                switch(status) {
                    case 401: {
                        $scope.message = "You must be authenticated!"
                    break;
                    }
                    case 500: {
                        $scope.message = "Something went wrong!";
                    break;
                    }
                }
            console.log(data, status);
        });
    };     
    //$scope.getStudents();
    $scope.getFiles = function () {
        console.log("Entering getFiles");
        $http.get("php/getFiles.php")
            .success(function(data, status, headers, config) {
                if (data != null){
                    $scope.files = data;
                }
                console.log(data, status);                                        
            })
            .error(function(data, status, headers, config) {
                switch(status) {
                    case 401: {
                        $scope.message = "You must be authenticated!"
                    break;
                    }
                    case 500: {
                        $scope.message = "Something went wrong!";
                    break;
                    }
                }
            console.log(data, status);
        });
    };     
    $scope.getFiles();    
});