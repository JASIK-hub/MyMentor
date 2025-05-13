let taskContainer=document.querySelector('.task')
let data = JSON.parse(localStorage.getItem('mentorsData')) || [];
let notesData=JSON.parse(localStorage.getItem('notes')) || []
let taskData=JSON.parse(localStorage.getItem('tasks')) || []
console.log(notesData)
console.log(data)
console.log(taskData)
document.querySelectorAll('.mentor').forEach(mentor=>{
    mentor.addEventListener('click',()=>{
        
        const mentorName = mentor.querySelector('.name').textContent;
        let clickedMentor=data.find(mentor=>mentor.name==mentorName)
        if(!clickedMentor){
            taskContainer.innerHTML=`
            <h2 style='font-size:30px'>Mentor: ${mentorName}</h2>
            <div class='tasksAndNotes' style='display:flex;justify-content:space-between;align-items:start;margin-top:30px'>
                <div class='tasks'>
                    <input class='goalInput'style='padding:5px;font-size:20px' placeholder='Your Goal'>
                </div>
                <div style='display:flex;flex-direction:column'>
                    <div style='display:grid;align-items:start;gap:10px;grid-template-columns:150px 1fr 50px'>
                        <input type='text' id='noteName'style='padding:5px;font-size:20px' placeholder='Note'>
                         <div class='addNoteContainer' style='display:flex;align-items:center;gap:20px'>
                            <input type='text' id='noteBody' style='padding:5px;font-size:20px' placeholder='Content'>
                            <button id='NoteBtn' style='border:none;background-color:rgb(246, 196, 58);padding:10px'>Set</button>
                        </div>
                    </div>
                <div class='notes'></div>
                </div>
            </div>
            `
                document.querySelector('.goalInput').addEventListener('keydown',(e)=>{
                    if(e.key=='Enter'){
                        let value=e.target.value
                        data.push({name:mentorName,goal:value})
                        localStorage.setItem('mentorsData',JSON.stringify(data))
                        document.querySelector('.tasks').innerHTML+=`
                            <div style='margin-top:20px'>
                                <p style='font-size:20px;font-weight:bold'>Your goal:${value}</p>
                                <ol></ol>
                            </div>
                        `
                        mentorExists(value,mentorName)
                    }
                })
                
               
        }
        
        else if(clickedMentor.goal) mentorExists(clickedMentor.goal,mentorName)
        checkboxChecked(mentorName)
        displayAllNotes(mentorName)
        document.querySelector('#NoteBtn').onclick = () => addNote(mentorName);
        
    })
})

function displayAllTasks(mentorName){
    document.querySelector('.taskBody').value=''
     document.querySelector('ol').innerHTML=``
    taskData.forEach(task=>{
        if(task.person == mentorName){
            document.querySelector('ol').innerHTML+=`
            <div style='display:flex;justify-content:space-between;align-items:center'>
                <div style='display:flex;align-items:center'>
                    <li>${task.task}</li>
                    <input type='checkbox' id=${task.id} class='checkbox'>
                </div>
                <button class='taskDeleter'>Delete</button>
            </div>
            
            `
        }
        
    })
    DeleteTask(mentorName)
}
function DeleteTask(mentorName){
    document.querySelectorAll('.taskDeleter').forEach(deleter=>{
        deleter.addEventListener('click',(e)=>{  
            taskData=taskData.filter(item=>item.id!=e.target.previousElementSibling.querySelector('input').id)
            localStorage.setItem("tasks", JSON.stringify(taskData));
            displayAllTasks(mentorName)
        })
    })
}
function displayAllNotes(mentorName){
   
    document.querySelector('.notes').innerHTML=``
    notesData.forEach(note=>{
        if(note.person==mentorName){
            document.querySelector('.notes').innerHTML+=`
            <div style='display:grid;gap:10px;grid-template-columns:250px 1fr;margin-top:30px;'> 
               <h2>Note: ${note.noteName}</h2> 
               <h2>Content: ${note.noteBody}</h2>
            </div>
            `
        }
    })
}
  
function checkboxChecked(mentorName){
    document.querySelectorAll('.checkbox').forEach(DOMcheckbox => {
        let saved = taskData.find(item => item.id == DOMcheckbox.id && item.person == mentorName);
        if (saved) DOMcheckbox.checked = saved.checked; //localdan страницаға шығару
        DOMcheckbox.addEventListener('change', () => {
            console.log('x')
            let existing = taskData.find(item =>item.person == mentorName && item.id == DOMcheckbox.id); 
            if (existing) {
                existing.checked = DOMcheckbox.checked;  
                localStorage.setItem("tasks", JSON.stringify(taskData));
            }
          
        });
    });
}
function addNote(mentorName){
    let noteName=document.querySelector('#noteName').value
    let noteBody=document.querySelector('#noteBody').value
    if(noteName!=='' && noteBody!==''){
        notesData.push({person:mentorName,noteName,noteBody})
        localStorage.setItem('notes',JSON.stringify(notesData))
        noteBody=''
        noteName=''
        displayAllNotes(mentorName)
    }
    else alert('Fill the empty space')
}

function mentorExists(goal,mentorName){
                taskContainer.innerHTML=`
                 <h2 style='font-size:30px'>Mentor: ${mentorName}</h2>
                 <div class='tasksAndNotes' style='display:flex;justify-content:space-between;;margin-top:30px'>
                     <div>
                     <div class='addTaskContainer' style='display:flex;gap:20px'>
                         <input class='goalInput'style='padding:5px;font-size:20px' placeholder='Your Goal'>
                         <div style='display:flex;align-items:center;gap:10px'>
                             <input class='taskBody'type='text' style='padding:5px;font-size:20px' placeholder='Add Task'>
                             <button id='addTask' style='border:none;background-color:rgb(246, 196, 58);padding:10px'>Add</button>
                         </div> 
                     </div>
                    <div style='margin-top:20px'>
                        <p style='font-size:20px;font-weight:bold' class='goal'>Your goal: ${goal}</p>
                        <ol style='display:flex;flex-direction:column'></ol>
                    </div>
                    </div>
                        <div style='display:flex;flex-direction:column'>
                            <div class='NotesContainer'style='display:grid;align-items:start;gap:10px;grid-template-columns:150px 1fr 50px'>
                                 <input type='text' id='noteName'style='padding:5px;font-size:20px' placeholder='Note'>
                                 <div class='addNoteContainer' style='display:flex;align-items:center;gap:20px'>
                                    <input type='text' id='noteBody' style='padding:5px;font-size:20px' placeholder='Content'>
                                    <button id='NoteBtn' style='border:none;background-color:rgb(246, 196, 58);padding:10px'>Set</button>
                                 </div>
                                 
                            </div>
                            <div class='notes'></div>
                        </div>
                </div>
                `
                document.querySelector('.goalInput').addEventListener('keydown',(e)=>{
                    if(e.key=='Enter'){
                        let typed=e.target.value
                        let currentData=data.find(mentor=>mentor.name==mentorName)
                        currentData.goal=typed
                        localStorage.setItem('mentorsData',JSON.stringify(data))
                        document.querySelector('.goal').textContent=`Your goal:${typed}`
                        e.target.value=''
                    }
                })
                      document.querySelector('#addTask').addEventListener('click',()=>{
                         let newTask=document.querySelector('.taskBody').value
                        taskData.push({person:mentorName,task:newTask,id:taskData.length+1,checked:false})
                        localStorage.setItem("tasks",JSON.stringify(taskData))
                        displayAllTasks(mentorName)
                        checkboxChecked(mentorName)
                      })
                       document.querySelector('#NoteBtn').onclick = () => addNote(mentorName);
                    displayAllTasks(mentorName)
                    
}

