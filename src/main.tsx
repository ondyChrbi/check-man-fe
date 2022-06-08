import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './midleware/store'
import { Provider } from 'react-redux'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<App />} />
            </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
)
