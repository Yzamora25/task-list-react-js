/* Importing the React library and the shortid library. */
import React from 'react';
import shortid from 'shortid';

/* This is the main function of the application. */
function App() {

  /* This is the useState hook. */
  /* A hook that allows us to use the state in functional components. */
  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null)


  /**
   * The function agregarTarea is a function that takes an event as an argument and prevents the
   * default action of the event. If the tarea is empty, it will log an error message to the console
   * and return. If the tarea is not empty, it will log the tarea to the console and add the tarea to
   * the tareas array. It will then set the tarea to an empty string and set the error to null
   * @returns return (
   *     <div className="container mt-5">
   *       <h1 className="text-center">CRUD Simple</h1>
   *       <hr/>
   *       <div className="row">
   *         <div className="col-8">
   *           <h4 className="text-center">Lista de Tareas</
   */
  const agregarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Element Empty')
      setError('Please write something...')
      return
    }
    console.log(tarea)

    setTareas([
      ...tareas,
      {id: shortid.generate(), nombreTarea:tarea}
    ])

    setTarea('')
    setError(null)
  }

  /**
   * The function takes an id as an argument, filters the array of tasks, and sets the filtered array
   * as the new state
   */
  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  /**
   * The editar function takes in an item and sets the modoEdicion to true, sets the tarea to the
   * item's nombreTarea, and sets the id to the item's id
   */
  const editar = item => {
    console.log(item)
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  /**
   * The function editarTarea() takes an event as an argument, prevents the default action of the
   * event, checks if the input is empty, if it is, it sets the error state to a string, if it isn't,
   * it maps through the array of tasks, and if the id of the task matches the id of the task being
   * edited, it replaces the task with the new task, and if it doesn't match, it returns the task as it
   * was
   * @returns The arrayEditado is being returned.
   */
  const editarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Element Empty')
      setError('Please write something...')
      return
    }

    const arrayEditado = tareas.map(
      item => item.id === id ? {id:id, nombreTarea:tarea} : item
      )
    
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className='bg-image text-white'>
    <div className="container mt-5 ">
      <h1 className="text-center">Welcome to the To Do List</h1>
      <hr/>
      <div className="row">
        <div className="col-6">
          <h4 className="text-center">list of tasks</h4>
          <ul className="list-group">
            {

              tareas.length === 0 ? (
                <li className="list-group-item list-group-item-primary">There are no tasks</li>
              ) : (
                tareas.map(item => (
                  <li className="list-group-item list-group-item-primary" key={item.id}>
                    <span className="lead">{item.nombreTarea}</span>
  
                    <button 
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      Delete
                    </button>
  
                    <button 
                      className="btn btn-warning btn-sm float-right"
                      onClick={() => editar(item)}
                    >
                      Edit
                    </button>
  
                  </li>
                ))
              )

            }


          </ul>
        </div>
        <div className="col-6">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Add Task'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>

            {
              error ? <span className="text-danger">{error}</span> : null
            }

            <input 
              type="text" 
              className="form-control mb-2"
              placeholder="Add Task"
              onChange={ e => setTarea(e.target.value) }
              value={tarea}
            />

            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Edit</button>
              ) : (
                <button className="btn btn-info btn-block" type="submit">Add</button>
              )
            }

          </form>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default App;
