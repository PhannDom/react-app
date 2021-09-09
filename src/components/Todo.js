import React, { Fragment, useState, useEffect }  from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
    const [todoState, setTodoState] = useState([])

    useEffect(() => {
        const getTodos = async () => {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
                setTodoState(res.data);
            } catch (error) {
                console.log(error.message)
            }
        }
        getTodos();
    }, [])

    const markComplete = id => {
        const newTodos = todoState.map(todo => {
            if(todo.id === id)
                todo.isComplete = !todo.isComplete
            return todo
        });

        setTodoState(newTodos);
    }
    
    const deleteTodo = async id => {
        try {
          await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
          const newTodos = todoState.filter(todo => todo.id !== id)
          setTodoState(newTodos)
        } catch (error) {
          console.log(error.message)
        }
      }

    const result = todoState.map(todo => {
        return <TodoItem 
                    key={todo.id} 
                    todoProps={todo} 
                    markCompleteFunc={markComplete} 
                    deleteTodoFunc={deleteTodo}
                />
    });

    //Call axios api
    const addTodo = async title => {
        try {
            const res = await axios.post(
                'https://jsonplaceholder.typicode.com/todos',
                {
                  id: uuidv4(),
                  title,
                  completed: false
                }
              )
              console.log(res.data)
              const newTodos = [...todoState, res.data]
              setTodoState(newTodos)
        } catch (error) {
            console.log(error.message)
        }
    }

    //Add Todo
    // const addTodo = title => {
    //     const newTodos = [
    //         ...todoState, {
    //             id: uuidv4(),
    //             title,
    //             isComplete: false
    //         }
    //     ]
    //     setTodoState(newTodos)
    // }

    return (
        <Fragment>
            <AddTodo addTodoFunc={addTodo}/>
            {result}
        </Fragment>
    )
}

export default Todo