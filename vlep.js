////////////////////////////////////////////////////////
function Student(id, name, teach = "", learn = ""){
    this.hold = false;
    this.proposed = false;
    this.id = id;
    this.name = name;
    this.teach = [];
    this.learn = [];
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
            nameList.push(candidate.id);
        })
        console.log(this.name + " => " + nameList.join(", "));
    }
}
////////////////////////////////////////////////////////
function Students(students) {
    this.students = students;
    this.cycles = 0;
    this.proposed = 0;
    this.members = this.students.length;
    this.printStudents = function(){
        this.students.forEach(student => {
            student.printCandidateList();
        });        
    }
    this.firstStep = function(){
        //First Step, every person need to make a proposal
        while(this.proposed < this.members){
            this.students.forEach(student => {
                if(!student.proposed) {
                    student.proposed = true;
                    this.proposed++;
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
                        this.proposed--;
                    }
                }
            });
        }
    }
    this.secondStep = function(){
        //Second Step, remove the less prefered
        this.students.forEach(student => {
            var target = student.candidate[0];
            target.removeLowerThan(student);
        });
    }
    this.thirdStep = function(){
        //Third Step, remove cycles
        this.checkCycles();
        while(this.cycles) {
            var i = 0;
            var achou = false;
            while(i < this.members && !achou) {
                if(this.students[i].candidate.length > 1) {
                    achou = true;
                } else {
                    i++;
                }
            }
            var p = [];
            var q = [];
            var candidate;
            p.push(this.students[i]);
            q.push(this.students[i].candidate[1]);
            achou = false;
            while(!achou){
                candidate = q[q.length-1].candidate[q[q.length-1].candidate.length-1];
                if(p.indexOf(candidate) != -1){
                    achou = true;
                    p.push(candidate);
                } else {
                    p.push(candidate);
                    q.push(candidate.candidate[1]);
                }                 
            }
            for(i = 0; i < q.length; i++) {
                q[i].removeCandidate(p[i+1]);
                p[i+1].removeCandidate(q[i]);
            }
            this.checkCycles();
        }
    }
    this.checkCycles = function(){
        this.cycles = 0;
        this.students.forEach(student => {
            if (student.candidate.length > 1){
                this.cycles = 1;
            }
        });
    }
}
////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////
roomMate = new Students(students);
roomMate.printStudents();
console.log("------------------");
roomMate.firstStep();
roomMate.printStudents();
console.log("------------------");
roomMate.secondStep();
roomMate.printStudents();
console.log("------------------");
roomMate.thirdStep();
roomMate.printStudents();
////////////////////////////////////////////////////////