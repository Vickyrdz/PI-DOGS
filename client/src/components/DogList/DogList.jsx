import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getAllDogs } from '../../redux/actions';
import Card from '../HomePage/Card/Card'
import styles from "../DogList/DogList.module.css"; 
import { Pagination } from "../HomePage/Pagination/Pagination";

export default function DogList () {
    const dispatch = useDispatch();

    // useSelector sirve para acceder a una parte del estado de redux
    // es lo mismo que hacer mapStateToProps y recibir allDogs como prop en listado
    const dogs = useSelector((state) => state.allDogs)

    useEffect(() => {  //useEffect escucha cambios del componente 
        dispatch(getAllDogs()); //dispacth trae la info 
    }, []);

    const [page, setPage] = useState(1); 
    const [quantityForPage, setQuantityForPage] = useState(8); 

    
    const max = Math.ceil( dogs.length / quantityForPage); 
    
    console.log({ l: dogs.length });
    return (
        
        <div>
            <div  className={styles.dogListContainer}>
            {
                dogs.slice((page - 1) * quantityForPage, (page - 1) * quantityForPage + quantityForPage)
                .map((item) => (
                    <Card
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        height={item.height}
                        weight={item.weight}
                        life_span={item.life_span}
                    />
                ))
            }
            </div>
            <div className={styles.pagination}>
                <Pagination page={page} setPage={setPage} max={max}/>
            </div>
        </div>
    );
};