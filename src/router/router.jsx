import { createBrowserRouter } from "react-router-dom"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"
import { Register } from "../pages/Register"

export const router = createBrowserRouter([
    {
        path : '/',
        element : <Login />
    },
    {
        path : '/login',
        element : <Login />
    },
    {
        path : '/home',
        element : <Home />
    },
    {
        path : '/register',
        element : <Register />
    },
    
])