const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');

const LOCAL_STORAGE_TODOS = 'LOCAL_STORAGE_TODO';
const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS)) || 
    {
    todo : [],
    inProgress : [],
    finish : []
    };


function saveTodos() {
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(tasks));
}

btn.addEventListener('click', addList);

// input.addEventListener('keypress', function(e){
//     console.log("wdjsnahc", e);
//     if(e.key == "Enter"){
//         e.preventDefault();
//         console.log(e);
//         btn.click();
//     }
// })

const notCompleted = document.querySelector('.to-do');
const progress = document.querySelector('.in-progress');
const completed = document.querySelector('.done');

const handleDeleteTask = (index, category) => {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS));
    
    console.log(index, data[category]);
    
    //data[category].splice(index,1);

    tasks[category].splice(index, 1);

    saveTodos();

    console.log(data[category]);

    location.reload();
}

const handleChaneCardStage = (index, category1, category2) =>{
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS));
    
    tasks[category2].push(tasks[category1][index]);
    tasks[category1].splice(index, 1);
    
    saveTodos();
    location.reload();
}

function displayItems(){
    
    const arr1 = tasks["todo"];
    const arr2 = tasks["inProgress"]
    const arr3 = tasks["finish"]

    //1
    for(let i=0; i<arr1.length; i++){
        
        const checkBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        // const prevBtn = document.createElement('button');
        
        checkBtn.innerHTML = '<i class="fa-solid fa-caret-right"></i>';
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        // prevBtn.innerHTML = '<i class="fa-solid fa-caret-left"></i>';
        
        delBtn.addEventListener('click', () => {
            console.log(i);
            let category = "todo";
            handleDeleteTask(i, category);
        })
        
        checkBtn.addEventListener('click', () => {
            let category1 = "todo";
            let category2 = "inProgress";
            handleChaneCardStage(i, category1, category2);
        })

        const taskDiv = document.createElement('div');
        taskDiv.setAttribute("class", `${arr1[i].id}`);
        taskDiv.classList.add('taskCard');

        taskDiv.textContent = `${arr1[i].divData}`;
    
        taskDiv.appendChild(checkBtn);
        taskDiv.appendChild(delBtn);
        
        notCompleted.appendChild(taskDiv);
    }
    
    //2
    for(let i=0; i<arr2.length; i++){
        
        console.log("here13feqv");

        const checkBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        const prevBtn = document.createElement('button');
        
        checkBtn.innerHTML = '<i class="fa-solid fa-caret-right"></i>';
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        prevBtn.innerHTML = '<i class="fa-solid fa-caret-left"></i>';

        const taskDiv = document.createElement('div');
        taskDiv.setAttribute("class", `${arr2[i].id}`);
        taskDiv.classList.add('taskCard');

        taskDiv.textContent = `${arr2[i].divData}`;
    
        taskDiv.appendChild(checkBtn);
        taskDiv.appendChild(delBtn);
        taskDiv.appendChild(prevBtn);
    
        progress.appendChild(taskDiv);

        delBtn.addEventListener('click', () => {
            console.log(i);
            let category = "inProgress";
            handleDeleteTask(i, category);
        })

        checkBtn.addEventListener('click', () => {
            let category1 = "inProgress";
            let category2 = "finish";
            handleChaneCardStage(i, category1, category2);
        })

        prevBtn.addEventListener('click', () => {
            let category1 = "inProgress";
            let category2 = "todo";
            handleChaneCardStage(i, category1, category2);
        })
    }
    
    //3
    for(let i=0; i<arr3.length; i++){
        
        const checkBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        const prevBtn = document.createElement('button');
        
        checkBtn.innerHTML = '<i class="fa-solid fa-caret-right"></i>';
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        prevBtn.innerHTML = '<i class="fa-solid fa-caret-left"></i>';

        const taskDiv = document.createElement('div');
        taskDiv.setAttribute("class", `${arr3[i].id}`);
        taskDiv.classList.add('taskCard');
        taskDiv.textContent = `${arr3[i].divData}`;
        
        taskDiv.appendChild(delBtn);
        taskDiv.appendChild(prevBtn);
    
        completed.appendChild(taskDiv);

        delBtn.addEventListener('click', () => {
            console.log(i);
            let category = "finish";
            handleDeleteTask(i, category);
        })

        prevBtn.addEventListener('click', () => {
            let category1 = "finish";
            let category2 = "inProgress";
            handleChaneCardStage(i, category1, category2);
        })
    }
}



function addList(e){

    if(input.value !== ''){

        let id = new Date().valueOf();
        let divData = input.value;
        tasks["todo"].push({id, divData});
        saveTodos();

        // input.value = '';

        // const checkBtn = document.createElement('button');
        // const delBtn = document.createElement('button');
        // const prevBtn = document.createElement('button');
    
        // checkBtn.innerHTML = '<i class="fa-solid fa-caret-right"></i>'; 
        // delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        // prevBtn.innerHTML = '<i class="fa-solid fa-caret-left"></i>';
        


        // const taskDiv = document.createElement('div');
        // taskDiv.setAttribute("class", `${id}`);
        // taskDiv.classList.add('taskCard');

        // taskDiv.textContent = `${divData}`;

        // taskDiv.appendChild(checkBtn);
        // taskDiv.appendChild(delBtn);
    
        // notCompleted.appendChild(taskDiv);
        location.reload();
    }

    console.log("wsklcm", taskDiv)

    checkBtn.addEventListener('click', function(){

        console.log("inside checkbtn")

        const parent = this.parentNode;
        const gp = parent.parentNode;
        
        console.log(parent, gp);

        parent.remove();

        if(gp.classList.contains('to-do')){
            taskDiv.appendChild(prevBtn);
            progress.appendChild(parent);
            
            // console.log(tasks["todo"]);
            const li_id = getId(parent, tasks["todo"]);

            tasks["inProgress"].push(li_id[1]);
            tasks["todo"].splice(li_id[0],1);
        }

        if(gp.classList.contains('in-progress')){
            taskDiv.removeChild(checkBtn);
            // taskDiv.removeChild(prevBtn);
            completed.appendChild(parent);
            
            const li_id = getId(parent, tasks["inProgress"]);

            tasks["finish"].push(li_id[1]);
            tasks["inProgress"].splice(li_id[0],1);
        }
    })

    prevBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        const gp = parent.parentNode;
        parent.remove();

        if(gp.classList.contains('in-progress')){
            taskDiv.removeChild(prevBtn);
            notCompleted.appendChild(parent);
            
            // console.log(tasks["todo"]);
            const li_id = getId(parent, tasks["inProgress"]);

            tasks["todo"].push(li_id[1]);
            tasks["inProgress"].splice(li_id[0],1);
        }

        if(gp.classList.contains('done')){
            taskDiv.appendChild(checkBtn);
            progress.appendChild(parent);
            
            const li_id = getId(parent, tasks["finish"]);

            tasks["inProgress"].push(li_id[1]);
            tasks["finish"].splice(li_id[0],1);
        }

    })

    delBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        const gp = parent.parentNode;

        parent.remove();

        let li_id = [];

        if(gp.classList.contains('to-do')){
            li_id = getId(parent, tasks["todo"]);
            tasks["todo"].splice(li_id[0],1);
        }
        else if(gp.classList.contains('in-progress')){
            li_id = getId(parent, tasks["inProgress"]);
            tasks["inProgress"].splice(li_id[0],1);
        }
        else{
            console.log("before del", tasks);
            li_id = getId(parent, tasks["finish"]);
            console.log(li_id);
            tasks["finish"].splice(li_id[0],1);
            console.log("after del", tasks);
        }
    })
}

function getId(e, arr){

    console.log("here->", e, arr, tasks);
    // console.log(arr, "eqfjaschvg");
    for(var i=0; i<arr.length; i++)
        if(arr[i] == e.getAttribute("class")) return [i,arr[i]];
}


/*
{
    todo : [{di : , input : , btnStatus : }, {}, {}]
    in-progress : 
    done : 
}
 */
window.onload = function(){
    
    displayItems();
}
