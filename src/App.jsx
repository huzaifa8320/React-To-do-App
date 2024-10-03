import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [todo, setTodo] = useState([])
  const [todo_value, setTodo_Value] = useState('')
  const [loading, setLoading] = useState(true)
  const [alert_show, setAlert_Show] = useState('')
  const [editindex, setEditIndex] = useState(null)

  const closeAlert = () => {
    setAlert_Show('')
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodo(storedTodos);
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log('Change');
      localStorage.setItem('todos', JSON.stringify(todo))
    }
  }, [todo])



  const Add_todo = () => {
    setLoading(false)
    if (todo_value) {
      const arr = [...todo]
      arr.push({
        todo_text: todo_value,
      })
      setTodo(arr)
      setTodo_Value('')
      console.log(todo);
    }
  };

  const delete_todo = (index) => {
    setLoading(false)
    console.log('h', index);
    const arr = [...todo]
    arr.splice(index, 1)
    console.log(arr);
    setTodo(arr)
    setAlert_Show('Delete Successfully')
    setTimeout(() => {
      setAlert_Show('')
    }, 2000);
  }

  const edit_todo = (index) => {
    console.log('Working', index);
    const arr = [...todo]
    setTodo_Value(arr[index].todo_text)
    setEditIndex(index)
    // arr[index] = {
    //   todo_text: 'Hello',
    // }
    // setTodo(arr)
  }
  const updateTodo = () => {
    if (editindex !== null && todo_value) {
      const arr = [...todo];
      arr[editindex] = { todo_text: todo_value }
      setTodo(arr)
      setTodo_Value('');
      setEditIndex(null);
    }
  };

  return (
    <div className='text-white flex justify-center bg-cyan-600 items-center min-h-screen'>

      {/* Custom Alert  */}
      {alert_show &&
        <div className="z-20 cursor-pointer alert shadow-2xl p-3 rounded-lg bg-[#C5F3D7] border-l-8 border-green-400 show fixed right-3 top-5">
          <span className="text-green-600"><FontAwesomeIcon icon={faCircleCheck} /></span>
          <span className="px-3 msg text-green-600 font-semibold">{alert_show}</span>
          <span onClick={closeAlert} className="text-green-600"><FontAwesomeIcon icon={faXmark} /></span>
        </div>
      }
      <div className='bg-white py-3 text-black w-[480px] h-[500px] rounded-2xl px-5'>
        <h1 className='text-4xl font-semibold text-center text-cyan-600 my-6'>To-do list 🧾</h1>
        <div className='bg-cyan-600 text-white h-14 rounded-full flex px-4'>
          <input type="text" onKeyPress={(e) => {
            if (e.key === 'Enter') {
              editindex !== null ? updateTodo() : Add_todo();
            }
          }}
            onChange={(e) => setTodo_Value(e.target.value)} value={todo_value} className='bg-transparent outline-none font-semibold placeholder:text-white w-full' placeholder='Enter Todos' />
          <button className='bg-white text-cyan-600 font-semibold w-auto px-3 m-2 rounded-full' onClick={editindex == null ? Add_todo : updateTodo}>{editindex == null ? 'Add╶Todo' : 'Update╶Todo'}</button>
        </div>
        {todo.length > 0 ?
          <div className='my-4 overflow-y-auto  h-[300px]'>

            {todo.map((item, index) =>
              <div key={index} className='bg-cyan-600 my-5 rounded-lg h-14 px-4 text-white flex items-center font-semibold'>
                  <div>{index + 1}. {item.todo_text}</div>
                <button className='ms-auto m-2 bg-white text-cyan-600 font-semibold  w-20 h-10 rounded-full' onClick={() => edit_todo(index)}>Edit</button>
                <button className={`bg-white text-cyan-600  font-semibold  w-20 h-10 rounded-full`} onClick={() => delete_todo(index)}>Delete</button>
              </div>
            )
            }
          </div> : <p className='my-auto h-auto p-16 text-center font-semibold text-xl text-cyan-600'>No data 😕</p>
        }
      </div>
    </div>
  )
}

export default App
