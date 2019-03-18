import React from "react";

const CounterDisplay = ({counter}) =>{
  console.log('CounterDisplay render')
  return (
    <div>
        <div>New Items {counter}</div> 
    </div>
  );
};
export default React.memo(CounterDisplay);
