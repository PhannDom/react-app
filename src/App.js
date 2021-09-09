import React, { Fragment } from 'react';
import Header from './components/Header';
import Todo from './components/Todo';
import './App.css'

const App = () => {
  return (
    <Fragment>
      <Header />
      <Todo />
    </Fragment>
  );
}

export default App;
