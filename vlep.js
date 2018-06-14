function Student(id, name, teach = "", learn = ""){
    this.hold = false;
    this.proposed = false;
    this.id = id;
    this.name = name;
    this.teach = [];
    this.learn = [];
    this.holding = [];
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
        if(this.teach.indexOf(firstOption) > this.teach.indexOf(secondOption)){
            this.addHold(firstOption);
            secondOption.proposed = false;
            console.log(this.name + " will hold " + firstOption.name + " and declined " + secondOption.name);
        } else {
            this.addHold(secondOption);
            firstOption.proposed = false;
            console.log(this.name + " will hold " + secondOption.name + " and declined " + firstOption.name);            
        }
    }

}

charlie = new Student(1, "Charlie");
peter   = new Student(2, "Peter");
elise   = new Student(3, "Elise");
paul    = new Student(4, "Paul");
kelly   = new Student(5, "Kelly");
sam     = new Student(6, "Sam");

charlie.addTeach([peter, paul, sam, kelly, elise]);
peter.addTeach([kelly, elise, sam, paul, charlie]);
elise.addTeach([peter, sam, kelly, charlie, paul]);
paul.addTeach([elise, charlie, sam, peter, kelly]);
kelly.addTeach([peter, charlie, sam, elise, paul]);
sam.addTeach([charlie, paul, kelly, elise, peter]);

students = [charlie, peter, elise, paul, kelly, sam];
students.proposed = 0
students.members  = students.length;
console.log(students.proposed);
console.log(students.members);
while(students.proposed < students.members){
    students.forEach(student => {
        student.proposed = true;
        var target = student.teach[0];
        console.log(student.name + " proposed " + target.name);
        if(!target.hold){
            target.hold = true;
            target.addHold(student);
            console.log(target.name + " is holding " + student.name);
        } else {
            console.log(target.name + " is considering " + student.name);            
            target.addHold(student);
            target.takeDecision();
        }
        students.proposed++;
    });
}
//console.log(students);


/*
saulo = new Student(1, "Saulo", ["English", "Portuguese"], ["Mandarin", "Japanese"]);
junior = new Student(2, "Junior", "Portuguese", ["Mandarin", "Japanese"]);
roger = new Student(3, "Roger", "", "Portuguese");
console.log(saulo);
saulo.addTeach("Spanish");
console.log(saulo);
console.log(junior);
junior.addTeach(["Mandarin", "Russian"]);
console.log(junior);
console.log(roger);
roger.addTeach("English");
console.log(roger);
*/