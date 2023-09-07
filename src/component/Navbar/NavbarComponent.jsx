import React, {useEffect, useState} from 'react'
import styles from '../../style/NavbarComponent.module.css'
import {SignOutAPI} from '../../api/AuthAPI'
import {useNavigate} from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebaseConfig';
const NavbarComponent = () => {
    
    const [user_is_auth,setUser_is_auth ] = useState(false)
    
    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (res) {
                setUser_is_auth(true)
            } 
        })
    }, [])
    
    
    const navigate = useNavigate()
    const logout = async () => {
        await SignOutAPI()
        navigate('/login')
    }
    
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <h1>Todo App</h1>
                <ion-icon name="newspaper-outline"></ion-icon>
            </div>
            <div className={styles.navigation}>
                <ul>
                    <li>
                        <a href="#">
                            <span>Home
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span>
                                Profile
                            <ion-icon name="person-outline"></ion-icon>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span>New Todo
                            <ion-icon name="clipboard-outline"></ion-icon>
                            </span>
                        </a>
                    </li>
                    {user_is_auth && (
                        <li>
                            <a >
                                <span className={styles.fbtn} >Sign out
                                <button className={styles.button} onClick={logout}>
                                    <ion-icon name="log-out-outline"></ion-icon>
                                </button>
                                </span>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export {NavbarComponent}
