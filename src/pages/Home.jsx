import {useEffect, useState} from "react"
import HomeComponent from "../component/HomeComponent"
import {onAuthStateChanged} from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useNavigate } from "react-router-dom"
import Loader from "../component/Loader/Loader"

export const Home = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (!res?.accessToken) {
                navigate('/login')
            }else {
                setLoading(false)
            }
        })
    },[])
    
    return loading ? <Loader /> : (<HomeComponent  />)
}
