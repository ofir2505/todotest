import React ,{useState,useEffect} from "react";
import uuid from "uuid/v4";
import {fetchTodos} from "../data/todoData";
import TodoItem from "./TodoItem";
import CounterDisplay from "./CounterDisplay";

const TodolistHooks = ()=>{ 
  const [todoName,setTodoName] = useState('');
  const [todos,setTodos] = useState([]);
  const [counter,setCounter]= useState(0);
  

  useEffect(()=>{
    const todos=fetchTodos();
        setTodos(todos);
  },[todos.length>0])

  
    const addTodo = () => {
      const newTodo={
        id:uuid(),
        title:todoName,
        completed:false
      }


        setTodoName('');
        setTodos([...todos,newTodo]);
        setCounter(counter+1);     
  };

 

  const onItemClick=(item)=>{
    
    setTodos(
        todos.map(el => 
        (el.id === item.id  
            ?{...el, completed:!item.completed} 
            : el))
        );
    }

 const deleteTodo=(item)=>{
    setTodos(todos.filter(el => el.id !== item.id));
  }

    return( 
      <React.Fragment>
        <input type="text" 
         name="todoName" 
        value={todoName} 
      
        onChange={(event)=>setTodoName(event.target.value)} />
        <button onClick={addTodo}>Add</button>
        <ul>
            {todos.map(todo=>
            <TodoItem 
                key={todo.id} 
                todo={todo} 
                onClick={()=>onItemClick(todo)}
                onDeleteTodo={()=>deleteTodo(todo)}
               />)}
        </ul>
       <CounterDisplay counter={counter}/>
      </React.Fragment>
    );
}
 

export default TodolistHooks;
