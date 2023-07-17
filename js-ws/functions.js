/**
 * 1. named functions
 * 2. anonymous functions
 */

// 1. named functions: functiion with name
/*
display();
function display(){
    console.log("named function");
}

// 2. anonymous functions

var sayName=function(){
    console.log("I am Praveen");
}
sayName();
*/


/*
// nested functions
// function context: every function has only one unique context
// context name is always the same as function name
var a=10; // global context
function f1(){ // f1 context
   var a=20; // f1 context
    console.log("f1 function - a: " + a);
    function f2(){ // f2 context
        //var a=30; // f2 context
        console.log("f2 function - a: " + a);
    }
    f2();
} // end of f1 function


f1()// f1 function will not call f2 function

// note: js always gives first prefrence to the local context
*/


// this operator

/*
var a=10;

function f1(){
    var a=20;
    console.log("f1 function - a: " + a);
    let f2={
        sayName:function(){
            console.log("sayName: " + this.a);  
        }
    }
    f2.sayName();
}

f1();

var a=10;

 let f1={
   a:20,
   f2:{
    a:30,
    fun1:function(){
        var a=50
        console.log(this.a);
    }
   },
   f3:{
    a:40,
    fun2:function(){
        var a=60;
        console.log(a);
    }
   }

 }

 f1.f2.fun1();
 f1.f3.fun2();


var a=10;
  f1={
    a:1,
    f2:{
        a:2,
        fun1:function(){
            console.log(a); // alwasy global
            console.log(this.a); // current object a
            console.log(f1.a); // f1 objects a
        }
    }
  }


  f1.f2.fun1();

  */


  // function return type
/*
  function teach(){
    console.log("teaching...");
    function learn(){
        console.log("... learning");
    }
    learn();
  }

  teach();
  teach();

  */

  /*
  function teach(){
    console.log("teaching...");
    function learn(){
        console.log("... learning");
    }
    return learn;
  }// parent fun ends here

  var funObj=teach();
  funObj();
  funObj();
  */

  // multiple function return 

  function validateForm(){
    console.log("reading form values ..");

    function validateName(){
        console.log("validating name");
    }

    function validateEmail(){
        console.log("vlidating email");
    }

    function validateMobileNumber(){
        console.log("validating mobile number");
    }
    return {validateName,validateEmail,validateMobileNumber};
  }


  var funObj=validateForm();
 funObj.validateEmail();
 funObj.validateMobileNumber();
 funObj.validateName();


 funObj.validateEmail();
 funObj.validateMobileNumber();
 funObj.validateName();

