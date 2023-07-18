import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getAllDogs } from '../../redux/actions';
import Card from '../HomePage/Card/Card'
import styles from "../DogList/DogList.module.css";
import { Pagination } from "../HomePage/Pagination/Pagination";
import { Filters } from "../HomePage/Filters/Filters";

export default function DogList() {
    const dispatch = useDispatch();

    // useSelector sirve para acceder a una parte del estado de redux
    // es lo mismo que hacer mapStateToProps y recibir allDogs como prop en listado
    const dogs = useSelector((state) => state.allDogs);
    const search = useSelector((state) => state.search);
    const dogsByName = useSelector((state) => state.dogsByName);
    const currentFilter = useSelector((state) => state.currentFilter);
    const primaryOrder = useSelector((state) => state.primaryOrder);
    const secondaryOrder = useSelector((state) => state.secondaryOrder);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {  //useEffect escucha cambios del componente 
        // si no tengo criterio de busqueda, traigo todo
        dispatch(getAllDogs()); //dispacth trae la info 
    }, []);

    useEffect(() => {
        // si tengo criterio de busqueda, muestro la lista filtrada, sino la completa
        const list = search ? dogsByName : dogs;
        const newList = list
            .filter((dog) => {
                if (currentFilter.tempName === 'ALL') return true;
                if (currentFilter.tempName === 'WITHOUT') return !dog.temperament;
                const hasTemperament = dog.temperament && dog.temperament.includes(currentFilter.tempName);
                return hasTemperament;
            })
            .filter((dog) => {
                if (currentFilter.source === 'ALL') return true;
                if (currentFilter.source === 'DB') return dog.source === 'DB';
                return !dog.source;
            })
            .sort((aDog, bDog) => {
                const AZLessWeight = primaryOrder === 'A-Z' && secondaryOrder === 'LIGHTER';
                const AZMoreWeight = primaryOrder === 'A-Z' && secondaryOrder === 'HEAVIER';
                const ZALessWeight = primaryOrder === 'Z-A' && secondaryOrder === 'LIGHTER';
                const ZAMoreWeight = primaryOrder === 'Z-A' && secondaryOrder === 'HEAVIER';

                let aDogWeight;
                let bDogWeight;

                if (aDog.source === 'DB') {
                    const aWeights = aDog.weight.split('-').map((weight) => weight.trim());
                    aDogWeight = aWeights[1];
                } else {
                    if (Number.isNaN(parseInt(aDog.weight.metric))) aDogWeight = 0;

                    else {
                        const aWeights = aDog.weight.metric.split('-').map((weight) => weight.trim());
                        const validMin = !Number.isNaN(parseInt(aWeights[0]));
                        const validMax = !Number.isNaN(parseInt(aWeights[1]));
                        if (validMax) aDogWeight = aWeights[1];
                        else if (validMin) aDogWeight = aWeights[0];
                        else aDogWeight = 0;
                    }
                }

                if (bDog.source === 'DB') {
                    const bWeights = bDog.weight.split('-').map((weight) => weight.trim());
                    bDogWeight = bWeights[1];
                } else {
                    if (Number.isNaN(parseInt(bDog.weight.metric))) bDogWeight = 0;

                    else {
                        const bWeights = bDog.weight.metric.split('-').map((weight) => weight.trim());
                        const validMin = !Number.isNaN(parseInt(bWeights[0]));
                        const validMax = !Number.isNaN(parseInt(bWeights[1]));
                        if (validMax) bDogWeight = bWeights[1];
                        else if (validMin) bDogWeight = bWeights[0];
                        else bDogWeight = 0;
                    }
                }

                if (AZLessWeight) {
                    return (aDogWeight - bDogWeight || aDog.name.localeCompare(bDog.name));
                }
                else if (ZALessWeight) {
                    return (aDogWeight - bDogWeight || bDog.name.localeCompare(aDog.name));
                }
                else if (AZMoreWeight) {
                    return (bDogWeight - aDogWeight || aDog.name.localeCompare(bDog.name));
                }
                else if (ZAMoreWeight) {
                    return (bDogWeight - aDogWeight || bDog.name.localeCompare(aDog.name));
                }

                return true;
            });
        console.log({ newList });
        setFilteredList(newList);
    }, [dogs.length, dogsByName.length, search, currentFilter, primaryOrder, secondaryOrder]);

    const [page, setPage] = useState(1);
    const [quantityForPage, setQuantityForPage] = useState(8);

    const max = Math.ceil(filteredList.length / quantityForPage);

    return (

        <div>
            <div className={styles.filters}>
                <Filters />
            </div>
            <div className={styles.dogListContainer}>

                {
                    filteredList.slice((page - 1) * quantityForPage, (page - 1) * quantityForPage + quantityForPage)
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
                <Pagination page={page} setPage={setPage} max={max} />
            </div>
        </div>
    );
};