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

    // Get users geolocation information
     function getLocation(){
        return new Promise((resolve,reject) =>{
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position)=>{
                    resolve({
                        lat:position.coords.latitude,
                        long:position.coords.longitude
                    });
                },reject)
            }else{
                reject(new Error('Geolocation not supported by this browser'))
            }
        });
    }

    addTaskButton.addEventListener('click', async () => {
        console.log(">>>1");
        const task=taskInput.value;
        if(task){
            let location;
            try{
                location=await getLocation();
            }catch(e){
                location={lat:null,long:null};
            }
            const taskWithLocation={task,location};
            tasks.push(task);
            tasks.push(taskWithLocation);
            Cache.save(tasks);
            
            localStorage.setItem('tasks', JSON.stringify(tasks));

            addTaskToList(taskWithLocation,task.length-1);
            taskInput.value = ''
        }

    });

    function addTaskToList(taskObj, index) {
        console.log(taskObj);
       const li=document.createElement('li');
       const taskText=document.createElement('span');
       taskText.textContent = taskObj.task;
       taskText.textContent = `${taskObj.task} (Location: ${taskObj.location && taskObj.location.lat ? taskObj.location.lat.toFixed(2) : 'unknown'}, ${taskObj.location && taskObj.location.long ? taskObj.location.long.toFixed(2) : 'unknown'})`;
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


  