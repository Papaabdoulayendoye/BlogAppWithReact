import React, {useEffect, useState} from "react"
import styles from "../style/HomeComponent.module.css"
import { NavbarComponent } from "./Navbar/NavbarComponent";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebaseConfig";
import LeftComponent from "./HomeLayout/LeftComponent";
import MainComponent from "./HomeLayout/MainComponent";
import RightComponent from "./HomeLayout/RightComponent";

const HomeComponent = () => {
    const [user, setUser] = useState()
    
    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            setUser(res)
        })
    
    }, [])
    return (
        <div className={styles.HOME}>
            <NavbarComponent />
            <div className={styles.Container}>
                <LeftComponent user={user} />
                <MainComponent user={user} />
                <RightComponent />
            </div>
        </div>
    )
}
export default  HomeComponent