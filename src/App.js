import React from 'react';
import './App.css';
const Task = ({done, title, imageUrl}) => {
    return (<div className="Task">
            <input type="checkbox" checked={done} />
            <span className="TaskText">{title} </span>
        <TaskAvatar imageUrl={imageUrl} />
        <button type="button"> editar </button>
            <button type="button"> borrar </button>


        </div>);
};
const TaskAvatar = ({imageUrl}) => {
    if (imageUrl !== undefined) {
        return (<img className="TaskAvatar" src={imageUrl}/>);

    }
    return null;
}


const TaskList = ({tasks}) => {
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
- "paginación estatica: tasks va a ser una lista larga y tendremos una variable para controlar que tareas vemos.
-
 */
function App() {


/* Si la cantidad de tareas no done supera este número
queremos mostrar un aviso.

 */
    const overworkThereshold = 5;
    const tasks =
      [
          {done:false, title:'Item 1', who: 'Pablo', },
          {done:false, title: 'Item 2', who: 'Lidia', imageUrl:'/img/avatar2.jpg'},
          {done:false, title: 'Item3', who: 'marta', imageUrl:'/img/avatar2.jpg'},
          {done:false, title: 'Item4', who: 'Pablo', imageUrl:'/img/avatar2.jpg'},
          {done:false, title: 'Item4', who: 'Pablo', imageUrl:'/img/avatar2.jpg'},
          {done:false, title: 'Item4', who: 'Pablo',imageUrl:'/img/avatar2.jpg'},
          {done:true, title: 'Item4', who: 'Pablo'},

      ];
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
          </div>
      </div>




  );
}

export default App;
