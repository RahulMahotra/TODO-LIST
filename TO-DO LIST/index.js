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

    if(input.value !== ''){
        newLi.textContent = input.value;
        input.value = '';
        newLi.appendChild(checkBtn);
        newLi.appendChild(delBtn);
        notCompleted.appendChild(newLi);
    }

    const id = new Date().valueOf();

    tasks.todo.push({id, newLi});

    console.log(tasks);
    console.log(tasks["todo"][0]);

    checkBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        const gp = parent.parentNode;
        parent.remove();

        if(gp.classList.contains('to-do')){
            newLi.appendChild(prevBtn);
            progress.appendChild(parent);
        }

        if(gp.classList.contains('in-progress')){
            newLi.removeChild(checkBtn);
            newLi.removeChild(prevBtn);
            completed.appendChild(parent);
        }
    })

    prevBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        const gp = parent.parentNode;
        parent.remove();
        newLi.removeChild(prevBtn);
        notCompleted.appendChild(parent);
    })

    delBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        parent.remove();
    })

}

/*
{
    todo : [{id : , input : , btnStatus : }, {}, {}]

    in-progress : 
    
    done : 
}
 */