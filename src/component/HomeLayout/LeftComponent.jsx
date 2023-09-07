import React, {useState} from 'react'
import styles from '../../style/HomeComponent.module.css'
function LeftComponent({ user }) {
    return (
        <div className={styles.Left}>
            <div className={styles.userProfile}>
                <div className={styles.Photo}>
                    <img src={`${user?.photoURL}`}  alt="photoUser" />
                    <h3 style={{color : "#ababab"}}>Welcome there!</h3>
                    <h3>@{user?.displayName}</h3>
                </div>
                <div className={styles.userGroupe}>
                    <p>
                        <span>Group</span>
                        <ion-icon name="people-circle-outline"></ion-icon>
                    </p>
                    <p>
                        <span>Event</span>
                        <ion-icon name="alert-outline"></ion-icon>
                    </p>
                </div>
                <div className={styles.Items}>
                    <ion-icon name="pricetags-outline"></ion-icon> My items
                </div>
            </div>
            <div className={styles.userEvent}>
                <p>
                    <span>Event</span>
                    <img src="/event.avif" alt="" />
                </p>
            </div>
        </div>
    )
}

export default LeftComponent
