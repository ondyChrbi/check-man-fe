import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './features/authentication/store/store'
import {Provider} from 'react-redux'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import {ApolloProvider} from "@apollo/client";
import backendClient from "./lib/api/backendClient"
import './lib/i18next/i18next';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={backendClient}>
        <Provider store={store}>
            <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<App/>}/>
                    </Routes>
                </BrowserRouter>
            </React.StrictMode>
        </Provider>
    </ApolloProvider>
)
