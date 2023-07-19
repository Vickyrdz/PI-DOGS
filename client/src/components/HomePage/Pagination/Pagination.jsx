import React from "react";
import styles from "./Pagination.module.css"; 

export const Pagination = ({ page, setPage, max }) => {
    const min = 1;

    const nextPage = () => {
        setPage(parseInt(page) + 1); 
    };

    const backPage = () => {
        setPage(parseInt(page) - 1); 
    };

    const restriction = (event) => {
        if (event.keyCode === 13) { //es el enter
            const currentValue = event.target.value;
            if (currentValue >= min && currentValue <= max) {
                setPage(currentValue);
            }
            else {
                setPage(1);
            }
        }
    };

    const firstPage = () => {
        setPage(min);
    };
    
    const lastPage = () => {
        setPage(max);
    };

    return (
        <div className={styles.paginationContainer}>
            <button className={styles.button} onClick={firstPage}>FIRST PAGE</button>
            <button className={styles.button} disabled={page === 1 || page < 1} onClick={backPage}>BACK</button>
            <input className={styles.input} onChange={setPage} onKeyDown={event => restriction(event)} value={page} min={1} max={max} name="page" autoComplete="off" type="number"/>
            <p className={styles.p}>of {max}</p>
            <button  className={styles.button} disabled={page === max || page > max} onClick={nextPage}>NEXT</button>
            <button className={styles.button} onClick={lastPage}>LAST PAGE</button>
        </div>
    )
}