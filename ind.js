const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');

const tasks = {
    todo : [],
    inProgress : [],
    finish : []
}

btn.addEventListener('click', addList);

function addList(e){
    const notCompleted = document.querySelector('.to-do');
    const progress = document.querySelector('.in-progress');
    const completed = document.querySelector('.done');

    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const prevBtn = document.createElement('button');

    checkBtn.innerHTML = '<i class="fa-solid fa-caret-right"></i>';
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    prevBtn.innerHTML = '<i class="fa-solid fa-caret-left"></i>';

    let id = new Date().valueOf();
    newLi.setAttribute("class", `${id}`);

    if(input.value !== ''){
        newLi.textContent = input.value;
        input.value = '';
        newLi.appendChild(checkBtn);
        newLi.appendChild(delBtn);

        tasks.todo.push(id);
        notCompleted.appendChild(newLi);
    }

    // console.log(tasks["todo"][tasks["todo"].length-1]);

    checkBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        const gp = parent.parentNode;
        
        console.log(parent, gp);

        parent.remove();

        if(gp.classList.contains('to-do')){
            newLi.appendChild(prevBtn);
            progress.appendChild(parent);
            
            // console.log(tasks["todo"]);
            const li_id = getId(parent, tasks["todo"]);

            tasks["inProgress"].push(li_id[1]);
            tasks["todo"] = tasks["todo"].splice(li_id[0],li_id[0]);
        }

        if(gp.classList.contains('in-progress')){
            newLi.removeChild(checkBtn);
            // newLi.removeChild(prevBtn);
            completed.appendChild(parent);
            
            const li_id = getId(parent, tasks["inProgress"]);

            tasks["finish"].push(li_id[1]);
            tasks["inProgress"] = tasks["inProgress"].splice(li_id[0],li_id[0]);
        }
    })

    prevBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        const gp = parent.parentNode;
        parent.remove();

        if(gp.classList.contains('in-progress')){
            newLi.removeChild(prevBtn);
            notCompleted.appendChild(parent);
            
            // console.log(tasks["todo"]);
            const li_id = getId(parent, tasks["inProgress"]);

            tasks["todo"].push(li_id[1]);
            tasks["inProgress"] = tasks["inProgress"].splice(li_id[0],li_id[0]);
        }

        if(gp.classList.contains('done')){
            newLi.appendChild(checkBtn);
            progress.appendChild(parent);
            
            const li_id = getId(parent, tasks["finish"]);

            tasks["inProgress"].push(li_id[1]);
            tasks["finish"] = tasks["finish"].splice(li_id[0],li_id[0]);
        }

    })

    delBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        const gp = parent.parentNode;

        parent.remove();

        let li_id = [];

        if(gp.classList.contains('to-do')){
            li_id = getId(parent, tasks["todo"]);
            tasks["todo"] = tasks["todo"].splice(li_id[0],li_id[0]);
        }
        else if(gp.classList.contains('in-progress')){
            li_id = getId(parent, tasks["inProgress"]);
            tasks["inProgress"] = tasks["inProgress"].splice(li_id[0],li_id[0]);
        }
        else{
            console.log("before del", tasks);
            li_id = getId(parent, tasks["finish"]);
            console.log(li_id);
            tasks["finish"] = tasks["finsih"].splice(li_id[0],li_id[0]);
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
    todo : [{id : , input : , btnStatus : }, {}, {}]

    in-progress : 
    
    done : 
}
 */