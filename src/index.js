import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AlgorithmNameProvider} from "./contexts/algorithmNameContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AlgorithmNameProvider>
        <App/>
    </AlgorithmNameProvider>
);

