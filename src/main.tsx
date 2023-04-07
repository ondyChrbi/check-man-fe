import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './features/storage/store'
import {Provider} from 'react-redux'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import {ApolloProvider} from "@apollo/client";
import backendClient from "./lib/api/backendClient"
import './lib/i18next/i18next';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={backendClient}>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <React.StrictMode>
                    <BrowserRouter>
                        <Routes>
                            <Route path="*" element={<App/>}/>
                        </Routes>
                    </BrowserRouter>
                </React.StrictMode>
            </Provider>
        </QueryClientProvider>
    </ApolloProvider>
)
