import React from "react";

const TodoItem = ({todo,onDeleteTodo,onClick}) =>{  
  return (
    <li
      style={{ textDecoration: todo.completed ? "line-through" : "" }}
      onClick={()=>onClick()}
    >
      {todo.title}
      <button onClick={(event)=>{event.stopPropagation();onDeleteTodo()}}>X</button>
    </li>
  );
};
export default React.memo(TodoItem);
