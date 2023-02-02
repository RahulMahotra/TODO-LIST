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

    checkBtn.innerHTML = 'next';
    delBtn.innerHTML = 'del';
    prevBtn.innerHTML = 'prev';

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

    console.log(tasks);
    // console.log(tasks["todo"][tasks["todo"].length-1]);

    checkBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        const gp = parent.parentNode;
        
        console.log(parent, gp);

        parent.remove();

        // const li_id = getId(parent);

        if(gp.classList.contains('to-do')){
            newLi.appendChild(prevBtn);
            progress.appendChild(parent);
            
            // console.log(tasks["todo"]);
            const li_id = getId(parent, tasks["todo"]);

            tasks["inProgress"].push(li_id[1]);
            tasks["todo"].slice(li_id[0],li_id[0]);
        }

        if(gp.classList.contains('in-progress')){
            newLi.removeChild(checkBtn);
            newLi.removeChild(prevBtn);
            completed.appendChild(parent);
            
            const li_id = getId(parent, tasks["inProgress"]);

            tasks["finish"].push(li_id[1]);
            tasks["inProgress"].slice(li_id[0],li_id[0]);
        }
    })

    prevBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        const gp = parent.parentNode;
        parent.remove();
        newLi.removeChild(prevBtn);
        notCompleted.appendChild(parent);
        
        const li_id = getId(parent, tasks["inProgress"]);

        tasks["todo"].push(li_id[1]);
        tasks["inProgress"].slice(li_id[0],li_id[0]);

    })

    delBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        const gp = parent.parentNode;

        parent.remove();

        const c = gp.getAttribute("class");

        console.log(c);

        let li_id;

        if(c === "to-do")
            li_id = getId(parent, tasks["todo"]);
        else if(c === "in-progress")
            li_id = getId(parent, tasks["inProgress"]);
        else
            li_id = getId(parent, tasks["finish"]);


        tasks["todo"].push(li_id[1]);
        tasks["inProgress"].slice(li_id[0],li_id[0]);
    })

    console.log("a" , tasks);

}

function getId(e, arr){

    // const arr = tasks["todo"];

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