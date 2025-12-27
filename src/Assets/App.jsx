import React, {useReducer}from 'react'
import './App.css'
function App() {



let initialState = 0;
 const [state, dispatch] = useReducer(reducer,initialState,init);

function init(a) {
    return {const:a};
}
function reducer(state, action){
switch (action.type) {
    case 'increment':
        return {count: state.count +1};
    case 'decrement':
        return {count: state.count -1};
    case 'reset':
        return init(action.payload);
    default:
        throw new Error();


}
}

  return (
    <>
    <h1>Count: {state.count}</h1>
    <button onClick={() => dispatch({type: 'reset', payload:initialState})}>Reset</button>
    <button onClick={() => dispatch({type: 'decrement'})}> decrease</button>
    <button onClick={()=> dispatch({type: 'increment'})}>increase</button>
    
    </>
  )
}

export default App