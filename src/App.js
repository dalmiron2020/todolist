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

    const countSizes = [1, 2, 5, 10];
    {/* Creación de nuestro primer custom hook useCounter en el que agrupamos diferentes acciones y funcionalidades para ejecutar una parte de nuestro software.
    con ello conseguimos un codigo más limpio y ordenado ademas que para la propia compresión del programador u programadoes es más entendible */}

    const useCounter = (initialCounter, initialCountSize) => {

        const [counter, setCounter] = React.useState(initialCounter);
        const [countSize, setCountSize] = React.useState(initialCountSize);
        const countUp = () => setCounter(counter +countSize);
        const reset = () => {
            setCounter(initialCounter);
            setCountSize(initialCountSize);
    }
        const changeCountSize = e => setCountSize(parseInt(e.target.value));{/* Cuando nosn encontramos problemas con la interpretación de numeros
    y texto en este caso con el parseInt cambiamos el texto a numero*/}
return {
    counter,
    countSize,
    countUp,
    reset,
    changeCountSize,

        }
    }


        {/*usestate utilización en diferentes botones   */}



        const ButtonCounter = () => {
      const {
          counter,
          countSize,
          reset,
          countUp,
          changeCountSize
      } = useCounter(0,1);
    console.log("Rendering with countSize " + countSize);
        return(
            <>
                <button onClick={countUp}>Count {counter}</button>
                {/* La función siguiente lo que se consigue es que el boton reset aparezca cuando el boton contador pase de 0*/}
                <select onChange={changeCountSize} value={countSize}>
                    {countSizes.map(x => <option value={x}>{x}</option>)}
                    console.log(e.target.value); {/* Esta información es la que queremos guardar */}
                </select>
                {counter > 0 && <button onClick={reset}>Cick to reset</button> }
                <div>
                    <p>
                        Contador {countSize}
                    </p>
                </div>
        </>
    )
}
const ButtonCounter2 = () => {
    const { counter, reset, countUp} = useCounter(0,7);
        return (
            <>
                <p>Counted {counter}</p>
                <button onClick={countUp} >Add 7</button>
                <button onClick={reset}>Reset</button>

                </>

        )
    };
    {/* Creamos un display donde los inputs añadidos generan un id correlativo */}
const DisplayPeople = () => {
    const  [inputText, setInputText] = React.useState('');
    const [id, setId] = React.useState(0);

    const [people, setPeople] = React.useState([]);

const handleClick = () => {
    const someone = { name: inputText, id:id};
    setPeople([...people, someone]);
    setId (id +1);
    setInputText('');
}

    return (<>
        <input type = "text" onChange={e=> {
            setInputText(e.target.value)
        }} value={inputText}/>
        <button onClick= {handleClick}> Add people </button>
        {people.map(x => <p>{x.name}({x.id})</p>)}

        </>);

}

        const amountOfNotDone = tasks.filter(task=> !task.done).length;
        return (<div>
        <h1> Todo List </h1>
                <Warning tasks={tasks} />

          <h2> Ingresar tarea</h2>

                <DisplayPeople />



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
            <ButtonCounter/>
            <div>
            </div>
                <ButtonCounter2 />




      </div>




  );
}

export default App;
