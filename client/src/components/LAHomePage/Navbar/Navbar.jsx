import React from "react";
import styles from './Navbar.module.css'
import { Link } from "react-router-dom";
import NavImg from "../../../assets/landingDog.png";


export default function Navbar() {
   return (
      <nav className={styles.navbar}>
        <Link to={"/home"}>
         <img className={styles.navImg} src={NavImg} alt="" />
            {/* <img className={styles.icon} src="data:image/png;base64,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"></img> */}
        </Link>
        <span className={styles.create}>Create Your Dog</span>
        
        <div className={styles.searchbarContainer}>
           <input className={styles.input} type="search" />
           <button className={styles.button}>Search</button>
        </div>
       
      </nav>
   );
}
 