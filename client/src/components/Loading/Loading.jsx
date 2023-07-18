import React from "react";
import styles from "./Loading.module.css";
import gif from "../../assets/GIF LOADING - Dog chases his tail.gif";

export const Loading = () => {
    return (
        <div className={styles.container}>
            {/* <p className={styles.p}>Loading</p> */}
            <img className={styles.gif} src={gif} alt=""/>
        </div>
    )
}