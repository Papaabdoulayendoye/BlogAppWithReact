import {useEffect, useState} from "react"
import LoginComponent from "../component/LoginComponent"
import Loader from "../component/Loader/Loader"
import {onAuthStateChanged} from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (res?.accessToken) {
                navigate('/home')
            }else {
                setLoading(false)
            }
        })
    },[])
    return loading ? <Loader /> : <LoginComponent />  
}
