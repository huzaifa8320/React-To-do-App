import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todo, setTodo] = useState([])
  const [todo_value, setTodo_Value] = useState('')
  const [loading, setLoading] = useState(true)

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
        todo_text: todo_value 
      })
      setTodo(arr)
      setTodo_Value('')
      console.log(todo);
    }
  };

  const delete_todo = (index) => {
    setLoading(false)
    console.log('h' , index);
    const arr = [...todo]
    arr.splice(index , 1)
    console.log(arr);
    setTodo(arr)
  }

  return (
    <div className='text-white flex justify-center bg-cyan-600 border-4 items-center min-h-screen'>
      <div className='bg-white py-3 text-black w-[480px] h-[500px] rounded-2xl px-5'>
        <h1 className='text-4xl font-semibold text-center text-cyan-600 my-6'>To-do list 🧾</h1>
        <div className='bg-cyan-600 text-white h-14 rounded-full flex px-4'>
          <input type="text" onKeyPress={(e) => {
            if (e.key === 'Enter') {
              Add_todo()
            }
          }}
            onChange={(e) => setTodo_Value(e.target.value)} value={todo_value} className='bg-transparent outline-none font-semibold placeholder:text-white w-full' placeholder='Enter Todos' />
          <button className='bg-white text-cyan-600 font-semibold w-32 m-2 rounded-full' onClick={Add_todo}>Add-Todo</button>
        </div>
        <div className='my-4 overflow-y-auto  h-[300px]'>

          {todo.map((item, index) =>
              <div key={index} className='bg-cyan-600 my-5 rounded-lg h-14 px-4 text-white flex items-center font-semibold'>
                {index+1}. {item.todo_text}
                <button className='ms-auto m-2 bg-white text-cyan-600 font-semibold  w-20 h-10 rounded-full'>Edit</button>
                <button className='bg-white text-cyan-600 font-semibold  w-20 h-10 rounded-full' onClick={()=>delete_todo(index)}>Delete</button>
                </div>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default App
