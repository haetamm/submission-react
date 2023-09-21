import React from 'react';
import ReactDOM from 'react-dom/client';
import NoteApp from './components/NoteApp';
import './styles/App.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
)
