import React, { Component } from "react";
import TodoList from "./components/Todolist";
import TodolistHooks from "./components/TodolistHooks";
import TodolistReducer from "./components/TodolistReducer";

class App extends Component {
  render() {
    return (
      <div className="App">
          <TodoList />


          <TodolistHooks/>

          <TodolistReducer/>
      </div>
    );
  }
}

export default App;
