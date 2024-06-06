import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ShortNameProvider} from "./contexts/ShortNameContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ShortNameProvider>
          <App />
      </ShortNameProvider>
  </React.StrictMode>
);

