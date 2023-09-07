import React from 'react'
import styles from '../../style/HomeComponent.module.css'
function RightComponent() {
    return (
        <div className={styles.Right}>
                <h1>Our Sidebar</h1>
                <p>You can put any information here you`d like.</p>
            <div className={styles.rightSide}>
                <p>Latest Posts</p>
                <p>Announcements</p>
                <p>Calendars</p>
                <p>etc</p>
            </div>
        </div>
    )
}

export default RightComponent
