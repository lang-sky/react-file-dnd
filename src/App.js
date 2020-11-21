import React, { useReducer, useEffect, createRef } from 'react';
import './App.css';
import DragAndDrop from './components/DragAndDrop';

const App = () => {
  const appDiv = createRef();

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DEPTH':
        return { ...state, depth: action.depth };
      case 'SET_IN_ZONE':
        return { ...state, inZone: action.inZone };
      case 'ADD_FILE_TO_LIST':
        return { ...state, files: state.files.concat(action.files) };
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, {
    depth: 0,
    files: [],
    inZone: false,
  });

  useEffect(() => {
    appDiv.current.focus();
  });

  const handleKeyPress = (e) => {
    dispatch({ type: 'SET_IN_ZONE', inZone: false });
  };

  return (
    <div className="App" ref={appDiv} onKeyPress={handleKeyPress} tabIndex="-1">
      <h1>React drag and drop component</h1>
      <DragAndDrop data={data} dispatch={dispatch} />
      <ol>
        {data.files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default App;
