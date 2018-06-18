function Student(id, name, teach = "", learn = ""){
    this.hold = false;
    this.proposed = false;
    this.id = id;
    this.name = name;
    this.candidate = [];
    this.teach = [];
    this.learn = [];
    this.holding = [];
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
    this.addTeach(teach);
    this.addLearn = function(learn){
        if(Array.isArray(learn)){
            this.learn = this.learn.concat(learn);
        } else if(learn != "" && !learn){
            this.learn.push(learn);
        }
    }
    this.addLearn(learn);
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

charlie = new Student(1, "Charlie");
peter   = new Student(2, "Peter");
elise   = new Student(3, "Elise");
paul    = new Student(4, "Paul");
kelly   = new Student(5, "Kelly");
sam     = new Student(6, "Sam");

charlie.addCandidate([peter, paul, sam, kelly, elise]);
peter.addCandidate([kelly, elise, sam, paul, charlie]);
elise.addCandidate([peter, sam, kelly, charlie, paul]);
paul.addCandidate([elise, charlie, sam, peter, kelly]);
kelly.addCandidate([peter, charlie, sam, elise, paul]);
sam.addCandidate([charlie, paul, kelly, elise, peter]);

students = [charlie, peter, elise, paul, kelly, sam];
students.forEach(student => {
    student.printCandidateList();
});
students.proposed = 0;
students.members  = students.length;
//First Step, every person need to make a propose
while(students.proposed < students.members){
    students.forEach(student => {
        if(!student.proposed) {
            student.proposed = true;
            students.proposed++;
            var target = student.candidate[0];
            //console.log(student.name + " proposed " + target.name);
            if(!target.hold){
                target.hold = true;
                target.addHold(student);
                //console.log(target.name + " is holding " + student.name);
            } else {
                //console.log(target.name + " is considering " + student.name);
                target.addHold(student);
                target.takeDecision();
                students.proposed--;
            }
        }
    });
}
console.log("------------------");
students.forEach(student => {
    student.printCandidateList();
});
//Second Step, remove the less prefered
students.forEach(student => {
    var target = student.candidate[0];
    target.removeLowerThan(student);
});
console.log("------------------");
students.forEach(student => {
    student.printCandidateList();
});