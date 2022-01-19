import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListaLibros from './components/ListaLibros';

function App() {
  return (<>
    <div className="toolbar">
      <img width="40" src={logo} />
      <span>Reseñas</span>
      <div className="spacer"></div>
    </div>
    <div className="content">
      <ListaLibros />
    </div>
  </>
  );
}

export default App;
