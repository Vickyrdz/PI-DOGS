import React from "react";
import styles from './LandingPage.module.css'
import LandingImage from '../../assets/landingDog.png';


export default function landing() {
    return (
        <div className={styles.background}>
            <h1 className={styles.title}>¡WELCOME TO THE</h1>
            <h1 className={styles.title2}>THE DOGS-APP!</h1>
            <button className={styles.button}>START</button>
            <div>
                <div className={styles.bubble}> </div>
                <img className={styles.img} src={LandingImage} alt="" />
            </div>
            
        </div>
    )
   
}