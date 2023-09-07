import React,{ useEffect, useState} from 'react'
import styles from '../style/LoginComponent.module.css'
import { NavbarComponent } from './Navbar/NavbarComponent'
import { LoginAPI, SignInWithGoogleAPI } from '../api/AuthAPI'
import { useNavigate} from 'react-router-dom'
import { login } from "../configuration/reducer/userReducer";
import {  useDispatch } from 'react-redux'
import ModalRegister from './Modal/Modal.RegisterComponent'
import { BsGithub } from "react-icons/bs";


import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup' 
import { useForm } from 'react-hook-form'

const schemas = yup.object().shape({
    email : yup.string().email().required("Please input your email!"),
    password : yup.string().required("Please input your password!")
})


const LoginComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [current_user, setCurrent_user] = useState({})
    const [openModal,setopenModal] = useState(false)
    
    const {register , handleSubmit, formState : { errors }} = useForm({
        resolver : yupResolver(schemas)
    })
    
    const SignIn =  (data) => {
        LoginAPI(data.email, data.password)
        navigate('/home')
    }
    
    const LoginGoogle =  async () => {
        const result =  await SignInWithGoogleAPI()
        setCurrent_user(result)
        navigate('/home')
    }
    
    useEffect(() => {
        dispatch(login({new_user : current_user }))
    }, [current_user])
    
    return (
        <div className={styles.LoginComponent}>
            <NavbarComponent />
            {openModal && <ModalRegister openModal={openModal}  setopenModal={setopenModal} /> }
            <div className={styles.Container}>
                <div className={styles.Header}>
                    <h1>Sign in</h1>
                </div>
                <div className={styles.Content}>
                    <form onSubmit={handleSubmit(SignIn)} className={styles.formBx}>
                        <div className={styles.inputBx}>
                            <span>Email</span>
                            <input type="email" {...register('email')} placeholder='Email address or phone number' />
                            {errors.email?.message && <p className={styles.errors}>{errors.email.message}</p>}
                        </div>
                        <div className={styles.inputBx}>
                            <span>Password</span>
                            <input type="password" {...register('password')} placeholder='Password' />
                            {errors.password?.message && <p className={styles.errors}>{errors.password.message}</p>}
                        </div>
                        <button type='submit' className={styles.SubmitBtn}>Login</button>
                    </form>
                    <div className={styles.signUpDIV}>
                        <p className={styles.signUp}>Don't have an account?
                        <button onClick={ () => setopenModal(true)}
                            className={styles.SIGNUPMODAL}>
                            <a>Register now!</a>
                        </button>
                        </p>
                    </div>
                </div>
                <hr className={styles.HR}/>
                <div className={styles.BTN}>
                    <button onClick={LoginGoogle} className={styles.SigninWithGoogle}>
                        <img src="/google.svg" alt="" />
                        Sign in with Google
                    </button>
                    {/* 
                    <button className={styles.SigninWithGoogle}>
                        <ion-icon name="logo-apple"></ion-icon>
                        <BsGithub className='git' />
                        Sign in with Github
                    </button>
                     */}
                </div>
            </div>
        </div>
    )
}

export default LoginComponent
