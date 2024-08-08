import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify'
import 'antd/dist/antd';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {ConfigProvider} from 'antd';
import variables from './styles/variables.less'

import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/Store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <Provider store={store}>
        <ConfigProvider theme={variables}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ConfigProvider>
    </Provider>
</React.StrictMode>);

