var btn1=document.getElementById("b1");

var todos=[];

btn1.addEventListener("click",function(){
    var data=document.getElementById("t1");
    todos.push(data.value);
    data.value='';
    display();

});

// display todos
function display(){
    // get todo list elemengt (ul)
    let list=document.getElementById("todo-list");

    // clear current todo list
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }

    // create and append new todo 
    for(var i=0;i<todos.length;i++){

        let li=document.createElement('li');

        //create delete button for each todo
        let deleteButton=document.createElement('button');
        deleteButton.innerHTML='Delete';

        deleteButton.onclick=function(){
            deleteTodo();
       }  
       
       li.innerHTML=`${todos[i]}`
       li.appendChild(deleteButton);
       list.appendChild(li);


    }
}

function deleteTodo(){
    alert('deleteing..')
}
