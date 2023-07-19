document.addEventListener('DOMContentLoaded', (event) => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    //Cache object
    const Cache={
        tasks:null,
        load:function(){
            if(this.tasks===null){
                this.tasks=JSON.parse(localStorage.getItem('tasks'))||[];
            }
            return this.tasks;
        },
        save:function(tasks){
            this.tasks=tasks;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }; // end of Cache object

  // Load tasks from local storage or Cache
    let tasks = Cache.load();
  //let tasks=JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task,index) =>addTaskToList(task,index));
    addTaskButton.addEventListener('click', () => {
        const task=taskInput.value;
        if(task){
            tasks.push(task);
            Cache.save(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            addTaskToList(task,task.length-1);
            taskInput.value = ''
        }

    });

    function addTaskToList(task, index) {
       const li=document.createElement('li');
       const taskText=document.createElement('span');
        taskText.textContent=task
      // li.textContent=task;
       const deleteButton=document.createElement('button');
       deleteButton.textContent='Delete';
       deleteButton.addEventListener('click', ()=>{
        tasks= tasks.filter((task,idx)=>idx!==index);
        Cache.save(tasks);
        localStorage.setItem('tasks',JSON.stringify(tasks));
        taskList.removeChild(li);
       });

       li.appendChild(taskText);
       li.appendChild(deleteButton);
       taskList.appendChild(li); 

       // make the task editable on double click
       // taskText.addEventListener('blur')
       taskText.addEventListener('dblclick',()=>{
         const input=document.createElement('input');
         input.type="text";
         input.value=task;
         input.size=Math.max(task.length/2,4);
         li.insertBefore(input,taskText);
         li.removeChild(taskText);
         input.focus();
         // save the edit when the input loses focus or the enter key is pressed
         function saveEdit(){
            const newTask=input.value;
            tasks[index]=newTask;
            Cache.save(tasks)
            localStorage.setItem('tasks',JSON.stringify(tasks));
            taskText.textContent=newTask;
            li.insertBefore(taskText,input);
            li.removeChild(input);
            input.removeEventListener('blur',saveEdit);
            input.removeEventListener('keyup',handleKeyUp);
         }

         function handleKeyUp(event) {
            if(event.key==='Enter'){
                saveEdit();
            }
        }
        input.addEventListener('blur',saveEdit);
        input.addEventListener('keyup',handleKeyUp);
       });
    } // end of add function
});


  