import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import store from "./store/store";
document.addEventListener('DOMContentLoaded', ()=>{
    const root = document.getElementById('root');
    ReactDOM.render(<App store={store}/>, root);
});