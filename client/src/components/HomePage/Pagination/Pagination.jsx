import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./Pagination.module.css"; 

export const Pagination = ({ page, setPage, max }) => {
    const [input, setInput] = useState(page);  
    const min = 1;

    useEffect(() => {
        setInput(page);
    }, [page])


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
                setInput(1);
            }
        }
    };

    const onChange = (event) => {
        setInput(event.target.value)
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
            <button className={styles.button} disabled={page < 2} onClick={backPage}>BACK</button>
            <input className={styles.input} onChange={onChange} onKeyDown={event => restriction(event)} value={input} min={1} max={max} name="page" autoComplete="off" type="number"/>
            <p className={styles.p}>of {max}</p>
            <button  className={styles.button} disabled={page === max || page > max} onClick={nextPage}>NEXT</button>
            <button className={styles.button} onClick={lastPage}>LAST PAGE</button>
        </div>
    )
}