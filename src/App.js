import React from 'react';
import './App.css';
import data from './tasks.json';


const Task = ({done, title, imageUrl}) => {
    return (<div className="Task">
            <input type="checkbox" checked={done} />
            <span className="TaskText">{title} </span>
        {/* forma de realizar los condicionales en react */}

        {imageUrl && <img className= "TaskAvatar" src={imageUrl} />}
        <button type="button"> editar </button>
            <button type="button"> borrar </button>



        </div>);
};



const TaskList = ({tasks}) => {
    if (tasks.length === 0) {
        return <div> No tasks in this page</div>
    }
    return (
        <div>
            {tasks.map(task => <Task done={task.done} title={task.title} imageUrl = {task.imageUrl} />)}

        </div>);
};
const Warning = ({tasks}) => {

    const amountOfNotDone = tasks.filter(task => !task.done).length;
    const overworkThreshold = 5;
    if (amountOfNotDone > overworkThreshold) {
        return <div className='Warning'> Cuidado tienes mucho trabajo</div>;
    }

return null;

}
const TaskCounter = ({tasks}) => {

    const amountOfNotDone = tasks.filter(tasks => !tasks.done).length;
    return (
        <div>
            {amountOfNotDone} tasks left of {tasks.length}

        </div>
    );

}

/*

-  task.who ademas de nombre que contega la foto de la persona. Completado
- Overwork warning: añadir un aviso de tenemos más de 5 tareas por hacer Completado
- "paginación estatica: tasks va a ser una lista larga y tendremos una variable para controlar que tareas vemos. completo
-
 */

 const  getTasks = (tasks, page, pageSize) => {
        const initialPosition = page * pageSize;
        return tasks.slice(page * pageSize, (page + 1) * pageSize);
    };


function App() {


/* Si la cantidad de tareas no done supera este número
queremos mostrar un aviso.

 */
    const overworkThereshold = 5;
    const unfilteredTasks = data.tasks;
    const amountOfTasks = unfilteredTasks.length;
    const [page, setPage] = React.useState(0);
    const pageSize = 10;
    const pages = Math.ceil(amountOfTasks / 10);
    const tasks = getTasks(unfilteredTasks, page, pageSize);



        const amountOfNotDone = tasks.filter(task=> !task.done).length;
        return (<div>
        <h1> Todo List </h1>
                <Warning tasks={tasks} />

          <h2> Ingresar tarea</h2>

          <input type="text"></input>

          <button type="button">submit</button>

          <div>
              <div>
                 <TaskList tasks={tasks} />




              </div>

              <div>
                  <TaskCounter tasks = {tasks} />
              </div>
              <div>
                  load more

              </div>
              <div>
                  Seeing page {page} o {pages}

              </div>
         </div>


            {page > 0 && <button onClick={() => setPage(page - 1)}>Prev Page </button>}
            {page < pages && <button onClick={() => setPage(page + 1)}>Next Page </button>}

      </div>




  );
}

export default App;
