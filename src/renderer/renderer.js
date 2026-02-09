const taskNameInput = document.getElementById("taskName")
const taskTextInput = document.getElementById("taskText")
const addTaskButton = document.getElementById("addTaskButton")

const taskList = document.getElementById("taskList")

addTaskButton.addEventListener('click', async ()=> {
        const taskName = taskNameInput.value
        const taskText = taskTextInput.value

        if(!taskName || !taskText){
            alert("Заполните оба поля")
        }
        else{
            
            const result = await window.electronAPI.saveTask(taskName, taskText)

            const item = document.createElement('li')
            item.textContent = `${taskName}: ${taskText}`
            taskList.appendChild(item)

            taskNameInput.value=""
            taskTextInput.value=""
        }
    }
)

async function loadTasks() {
    const rows = await window.electronAPI.loadTasks()

    rows.forEach(row => {
        if(row.trim() === '') return
        const item = document.createElement('li')
        item.textContent = row.replace(' | ', ': ')
        taskList.appendChild(item)
    })

}

loadTasks()