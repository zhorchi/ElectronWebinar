const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, 'database.txt')

const taskNameInput = document.getElementById("taskName")
const taskTextInput = document.getElementById("taskText")
const addTaskButton = document.getElementById("addTaskButton")

const taskList = document.getElementById("taskList")

addTaskButton.addEventListener('click', ()=> {
        const taskName = taskNameInput.value
        const taskText = taskTextInput.value

        if(!taskName || !taskText){
            alert("Заполните оба поля")
        }
        else{
            const dataToSave = `${taskName} | ${taskText}\n`
            fs.appendFileSync(dbPath, dataToSave)

            const item = document.createElement('li')
            item.textContent = `${taskName}: ${taskText}`
            taskList.appendChild(item)

            taskNameInput.value=""
            taskTextInput.value=""
        }
    }
)

function loadTasks() {
    if (fs.existsSync(dbPath)){
        const fileContent = fs.readFileSync(dbPath, 'utf-8')
        const rows = fileContent.split('\n')
        rows.forEach(row => {
            if(row.trim() === '') return
            const item = document.createElement('li')
            item.textContent = row.replace(' | ', ': ')
            taskList.appendChild(item)
        })
    }
}

loadTasks()