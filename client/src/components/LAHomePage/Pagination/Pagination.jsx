import React, { useState } from "react";
import styles from "./Pagination.module.css"; 

export const Pagination = ({page, setPage, max}) => {
    const [input, setInput] = useState(1);  

    const nextPage = () => {
        setInput(parseInt(input) + 1);
        setPage(parseInt(page) + 1); 
    }
    const backPage = () => {
        setInput(parseInt(input) - 1);
        setPage(parseInt(page) - 1); 
    }

    const restriction = (event) => {
        if (event.keyCode == 13) {
            const min = 1;
            const currentValue = event.target.value;
            if (currentValue >= min && currentValue <= max) {
                setPage(currentValue);
            }
            else {
                setPage(1);
                setInput(1);
            }
        }
    }

    const onChange = (event) => {
        setInput(event.target.value)
    }
    
    const lastPage = () => {
        setPage(max);
        setInput(max);
    }

    return (
        <div className={styles.paginationContainer}>
            <button className={styles.button} disabled={page === 1 || page < 1} onClick={backPage}>BACK</button>
            <input className={styles.input} onChange={onChange} onKeyDown={event => restriction(event)} value={input} min={1} max={max} name="page" autoComplete="off" type="number"/>
            <p className={styles.p}>of {max}</p>
            <button  className={styles.button} disabled={page === max || page > max} onClick={nextPage}>NEXT</button>
            <button className={styles.button} onClick={lastPage}>LAST PAGE</button>
        </div>
    )
}