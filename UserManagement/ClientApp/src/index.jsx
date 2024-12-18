import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom'
import * as React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);