import React from 'react';
import './App.css';
import AsideOptions from './Components/AsideOptions';
import List from './Components/List'

function App() {
  return (
    <div className='app'>
      <aside className="app-aside-bar">
        <AsideOptions />
      </aside>
      <List />
    </div>
  );
}

export default App;