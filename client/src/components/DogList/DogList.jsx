import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getAllDogs } from '../../redux/actions';
import Card from '../homePage/Card/Card'
import styles from "../DogList/DogList.module.css"; 

export default function DogList () {
    const dispatch = useDispatch();

    // useSelector sirve para acceder a una parte del estado de redux
    // es lo mismo que hacer mapStateToProps y recibir allDogs como prop en listado
    const dogs = useSelector((state) => state.allDogs)

    useEffect(() => {  //useEffect escucha cambios del componente 
        dispatch(getAllDogs()); //dispacth trae la info 
    }, []);

    return (
        <div className={styles.dogListContainer}>
            {
                dogs.map((item) => (
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
    );
};