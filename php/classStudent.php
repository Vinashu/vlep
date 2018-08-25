<?php
class Student {
    public $id;            //0
    public $userName;      //2
    public $name;          //3
    public $surName;       //4
    public $status;        //5
    public $firstName;     //11
    public $lastName;      //12
    public $gender;        //13
    public $studentID;     //14    
    public $faculty;       //15
    public $major;         //16
    public $country;       //19
    public $teach  = [];   //21, 22, 32, 34, 35
    public $learn  = [];   //24, 25, 33, 36, 37
    public $social = [];   //38, 39, 40, 41, 42    
    public function __construct($data){
        $this->id       = $data[0];   //0
        $this->userName = $data[2];   //2
        $this->name     = $data[3];   //3
        $this->surName  = $data[4];   //4
        $this->status   = $data[5];   //5
        $this->firstName = $data[11]; //11
        $this->lastName = $data[12];  //12
        $this->gender   = $data[13];  //13
        $this->studentID = $data[14]; //14    
        $this->faculty  = $data[15];  //15
        $this->major    = $data[16];  //16
        $this->country  = $data[19];  //19
        $this->teach    = array($data[21], $data[22], $data[32], $data[34], $data[35]);   //21, 22, 32, 34, 35
        $this->learn    = array($data[24], $data[25], $data[33], $data[36], $data[37]);   //24, 25, 33, 36, 37
        $this->social   = array($data[38], $data[39], $data[40], $data[41], $data[42]);   //38, 39, 40, 41, 42            
        $this->clearData("teach");
        $this->clearData("learn");        
        $this->clearData("social");        
    }

    public function clearData($item){
        $size = count($this->$item);
        for($i = $size -1; $i >= 0; $i--) {
            if(empty($this->$item[$i])){
                unset($this->$item[$i]);
            }
        }
    }
}
?>