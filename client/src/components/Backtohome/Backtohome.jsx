import React from "react";
import { Link } from "react-router-dom";
import styles from "./Backtohome.module.css";

export const Backtohome = () => {
    return (
        <div className={styles.container}>
            <Link className={styles.link} to={"/home"}>
                <div className={styles.smallContainer}>
                <img className={styles.icon} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQUlEQVR4nO2WPU7DQBCFZ2eBFglOQMMd6JIOCip6JLgAR4COmjIleCZIjuAKVFTcAQER/yUIyIzDIgciRXiNUuzagPKkrT/N+M3zA5joL6qX4KYw3gjho7Jdiw50KcwJm44yuuETwoeoUE2gIYRXo9Av8F0UoGvBtJLZFca+B/qkbFeDQ18PYEEJT78DB4/w7O0QFoNDM8b1z4kKU74rmz2XwkxQoEthVsi0fVMOvnECDQgtJdsUxq4XyubI7cN8UKA7gSllsyOEmWfKF2Hcgn9hICW7IozPxbViPz+h/JQghoTxwgPtRjHQWGCyTYgpbdtl763GXnVt5qr1nEYlDEvKeF4SIMfBA6QQmWy4JDJvc19ATGVV/yR+j/FaPxSBPPVir17Lq8811FL2GO/dNiBUoR7jhjBe5kWvkno7EYyhD+iYzjs9pDC0AAAAAElFTkSuQmCC"/>
                <p className={styles.p}>Back to home</p>
                </div>
            </Link>
        </div>
    )
}