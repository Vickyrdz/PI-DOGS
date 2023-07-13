import React from "react";
import styles from './LandingPage.module.css'
import LandingImage from '../../assets/landingDog.png';
import { Link } from "react-router-dom";


export default function landing() {
    return (
        <div className={styles.background}>
            <h1 className={styles.title}>¡WELCOME TO THE</h1>
            <h1 className={styles.title2}>THE DOGS-APP!</h1>
            <Link to={"/home"}>
                <button className={styles.button}>START</button>
            </Link>
            <div>
                <div className={styles.bubble}> </div>
                <img className={styles.img} src={LandingImage} alt="" />
            </div>
            
        </div>
    )
   
}