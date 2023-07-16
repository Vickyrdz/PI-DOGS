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

    const restriction = (event)=> {
        if(event.keyCode == 13) {    //13 es el enter
            setPage (parseInt(event.target.value));
            if(
                parseInt(event.target.value < 1 ) ||
                parseInt(event.target.value > max) ||
                isNaN(parseInt(event.target.value))
            ){
                setInput(1);
                setPage(1); 
            } else {
                parseInt(event.value.target)
            }
        }
    }

    const onChange = (event) => {
        setInput(event.target.value)
    }

    const lastPage = () => {
        setPage = parseInt(page === max);
        setInput = parseInt(max)
    }

    return (
        <div className={styles.paginationContainer}>
            <button className={styles.button} disabled={page === 1 || page < 1} onClick={backPage}>BACK</button>
            <input className={styles.input} onChange={onChange} onKeyDown={event => restriction(event)} value={input} name="page" autoComplete="off"/>
            <p className={styles.p}>Of {max}</p>
            <button className={styles.button} disabled={page === max || page > max} onClick={nextPage}>NEXT</button>
            <button className={styles.button} onClick={lastPage}>LAST PAGE</button>
        </div>
    )
}