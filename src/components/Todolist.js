import React, { Component } from "react";
import uuid from "uuid/v4";
import {fetchTodos} from "../data/todoData";
import TodoItem from "./TodoItem";
import CounterDisplay from "./CounterDisplay";

class Todolist extends Component {
  
    constructor(props){
        super()
        this.state ={
            todoName:'',
            todos:[],
            counter:0
        }
    }

    componentDidMount=()=>{
        const todos=fetchTodos();
        this.setState({todos});
    }

    componentDidUpdate=(prevState)=>{
        if (this.state.todos.length===0){
            const todos=fetchTodos();
            this.setState({todos});
        }
    }
  
  addTodo = () => {
      const newTodo={
        id:uuid(),
        title:this.state.todoName,
        completed:false
      }
      this.setState({
          todoName:'',
          todos:[...this.state.todos,newTodo],
          counter:this.state.counter+1
        })

        
  };

  handleChange = e => {
      if (e.target.value!=='')
        this.setState({[e.target.name]:e.target.value})
  };

  onItemClick=(item)=>{
    
    this.setState({
        todos:this.state.todos.map(el => 
        (el.id === item.id  
            ?{...el, completed:!item.completed} 
            : el))
        });
  }

  deleteTodo=(item)=>{
    this.setState({todos:this.state.todos.filter(el => el.id !== item.id)});
  }

  render() {
    return (
      <React.Fragment>
        <input type="text" 
         name="todoName" 
        value={this.state.todoName} 
      
        onChange={this.handleChange} />
        <button onClick={this.addTodo}>Add</button>
        <ul>
            {this.state.todos.map(todo=>
            <TodoItem 
                key={todo.id} 
                todo={todo} 
                onClick={()=>this.onItemClick(todo)}
                onDeleteTodo={()=>this.deleteTodo(todo)}
               />)}
        </ul>
       <CounterDisplay counter={this.state.counter}/>

      </React.Fragment>
    );
  }
}

export default Todolist;
