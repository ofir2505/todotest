import React ,{useReducer,useEffect} from "react";
import uuid from "uuid/v4";
import {fetchTodos} from "../data/todoData";
import TodoItem from "./TodoItem";
import CounterDisplay from "./CounterDisplay";



const initialState = {
    todos:[],
    todoName:'uu',
    counter:0
};
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO': {
        return { ...state, todoName:'', counter:state.counter+1 ,todos:[...state.todos, action.payload] };
      }
      case 'DELETE_TODO': {
        return { ...state,  todos: state.todos.filter(el => el.id !== action.payload.id) };
      }
      case 'COMPLETE_TODO': {
        return { ...state, 
            todos:  state.todos.map(el => (el.id === action.payload.id) ?{...el, completed:!action.payload.completed} : el)
        }
      }
      case 'INIT_TODOS':{
          return {...state,todos:action.payload} 
      }
      case 'SET_TODO_NAME':{
        return {...state,todoName:action.payload} 
      }
      default: {
        return state;
      }
    }
  };


const TodolistReducer = ()=>{ 
 // const [state,dispach] = useReducer(reducer, initialState);
  const [{todos,todoName,counter},dispatch] = useReducer(reducer, initialState);
  

  useEffect(()=>{
    const todos=fetchTodos();
        dispatch({type:'INIT_TODOS',payload:todos})
  },[todos.length>0])

  
    const addTodo = () => {
      const newTodo={
        id:uuid(),
        title:todoName,
        completed:false
      }

      dispatch({type:'ADD_TODO',payload:newTodo})
  };

 

  const onItemClick=(item)=>{
    
    dispatch({type:'COMPLETE_TODO',payload:item })
  }
    const deleteTodo=(item)=>{
   
        dispatch({type:'DELETE_TODO',payload:item })
      
  }

    return( 
      <React.Fragment>
        <input type="text" 
         name="todoName" 
        value={todoName} 
        onChange={(event)=>dispatch({type:'SET_TODO_NAME',payload:event.target.value})} />
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
 

export default TodolistReducer;
