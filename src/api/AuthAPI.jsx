import {auth, GoogleProvider} from '../firebaseConfig'
import { 
    createUserWithEmailAndPassword ,
    signInWithEmailAndPassword, 
    signInWithPopup,
} from "firebase/auth";

import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../style/index.css'



const LoginAPI = async (email,password) => {
    try 
    {
        await signInWithEmailAndPassword(auth,email,password).then(data => data?.user)
        toast.success("Welcome to home page", {
            position : toast.POSITION.TOP_RIGHT,
            className : 'TOAST'
        })
    }catch (error) {
        toast.error("Please check your email and password!", {
            position : toast.POSITION.TOP_RIGHT,
            className : 'TOAST'
        })
    }
}

const RegisterAPI =  async (email,password) => {
    try {
        await createUserWithEmailAndPassword(auth,email,password)
        toast.success("your account has been created!", {
            position : toast.POSITION.TOP_RIGHT,
            className : 'TOAST'
        })
    } catch (error) {
        toast.error("Something wrong please try again", {
            position : toast.POSITION.TOP_RIGHT,
            className : 'TOAST'
        })
    }
    
}

const SignInWithGoogleAPI = async() => {
    try {
        const response = await signInWithPopup(auth,GoogleProvider).then(data => data?.user)
        toast.success("Sign in Successfully in your account", {
            position : toast.POSITION.TOP_RIGHT,
            className : 'TOAST'
        })
        return response
    } catch (error) {
        toast.error("Something wrong please try again", {
            position : toast.POSITION.TOP_RIGHT,
            className : 'TOAST'
        })
        return error
    }
}


const SignOutAPI =  async () => {
    try {
        await signOut(auth)
        toast.success("Sign out Successfully", {
            position : toast.POSITION.TOP_RIGHT,
            className : 'TOAST'
        })
    } catch (error) {
        toast.error("You can't not sign out!", {
            position : toast.POSITION.TOP_RIGHT,
            className : 'TOAST'
        })
        return error
    }
}



export {LoginAPI, RegisterAPI, SignInWithGoogleAPI, SignOutAPI}






