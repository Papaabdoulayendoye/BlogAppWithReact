import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './router/router'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from "react-redux";
import { store } from './store'
import './style/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router}/>
            <ToastContainer />
        </React.StrictMode>,
    </Provider>
)
