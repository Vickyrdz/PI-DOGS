import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getAllDogs, changeLoading } from '../../redux/actions';
import Card from '../HomePage/Card/Card'
import styles from "../DogList/DogList.module.css";
import { Pagination } from "../HomePage/Pagination/Pagination";
import { Filters } from "../HomePage/Filters/Filters";
import { Loading } from "../Loading/Loading";

const QUANTITY_FOR_PAGE = 8;

export default function DogList() {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    // useSelector sirve para acceder a una parte del estado de redux
    // es lo mismo que hacer mapStateToProps y recibir allDogs como prop en listado
    
    const dogs = useSelector((state) => state.allDogs);
    const loading = useSelector((state) => state.loading);
    const search = useSelector((state) => state.search);
    const dogsByName = useSelector((state) => state.dogsByName);
    const currentFilter = useSelector((state) => state.currentFilter);
    const order = useSelector((state) => state.order);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {  //useEffect escucha cambios del componente 
        // si no tengo criterio de busqueda, traigo todo
        dispatch(changeLoading(true));
        dispatch(getAllDogs());


        //Esto es por algo de extension 
    // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, []);

    useEffect(() => {
        // si tengo criterio de busqueda, muestro lo relacionado a la busqueda sini mouestro todo
        const list = search ? dogsByName : dogs;
        setPage(1);
        const newList = list
            .filter((dog) => {
                if (currentFilter.tempName === 'ALL') return true;
                //Esto es para los que vienen de la api sin temperamentos 
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
                if (!list.length > 1) return 0;
                const AZ = order === 'A-Z';
                const ZA = order === 'Z-A';
                const lessWeight = order === 'LIGHTER';
                const moreWeight = order === 'HEAVIER';

                //localcompare es por usar letras 
                if (AZ) return aDog.name.localeCompare(bDog.name);
                else if (ZA) return bDog.name.localeCompare(aDog.name);
                else {
                    const pesoPerroA = aDog.source === 'DB' ? aDog.weight : aDog.weight.metric;
                    const pesoPerroB = bDog.source === 'DB' ? bDog.weight : bDog.weight.metric;

                    //valido si no son NaN como string
                    const pesoEsNaNPerroA = pesoPerroA === 'NaN';
                    const pesoEsNaNPerroB = pesoPerroB === 'NaN';

                    // trato de obtener los minimos y maximos del peso como array, si ambos existen el length va a ser 2, sino 1
                    const minimoMaximoPerroA = pesoPerroA.split('-');
                    const minimoMaximoPerroB = pesoPerroB.split('-');

                    const unicoPesoPerroA = minimoMaximoPerroA.length === 1;
                    const unicoPesoPerroB = minimoMaximoPerroB.length === 1;

                    // si el peso es NaN uso 0 para poder ordenar bien
                    // si es un solo número lo trato como maximo
                    // si son dos números, tomo el de la derecha ya que es el mayor
                    const valorPesoMaximoPerroA = pesoEsNaNPerroA ? 0 : (unicoPesoPerroA ? minimoMaximoPerroA[0] : minimoMaximoPerroA[1]);
                    const valorPesoMaximoPerroB = pesoEsNaNPerroB ? 0 : (unicoPesoPerroB ? minimoMaximoPerroB[0] : minimoMaximoPerroB[1]);

                    const numeroPesoMaximoPerroA = Number.parseInt(valorPesoMaximoPerroA);
                    const pesoFinalPerroA = Number.isNaN(numeroPesoMaximoPerroA) ? 0 : numeroPesoMaximoPerroA;
                    
                    const numeroPesoMaximoPerroB = Number.parseInt(valorPesoMaximoPerroB);
                    const pesoFinalPerroB = Number.isNaN(numeroPesoMaximoPerroB) ? 0 : numeroPesoMaximoPerroB;

                    if (lessWeight) return pesoFinalPerroA - pesoFinalPerroB;
                    else if (moreWeight) return pesoFinalPerroB - pesoFinalPerroA;

                    return 0;
                }

            });
        setFilteredList(newList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dogs.length, dogsByName.length, search, currentFilter, order]);

    useEffect(() => {
        dispatch(changeLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredList]);

    const max = Math.ceil(filteredList.length / QUANTITY_FOR_PAGE);

    if (loading) return <Loading />;

    return (

        <div>
            <div className={styles.filters}>
                <Filters />
            </div>
            <div className={styles.dogListContainer}>

                {
                    filteredList.slice((page - 1) * QUANTITY_FOR_PAGE, (page - 1) * QUANTITY_FOR_PAGE + QUANTITY_FOR_PAGE)
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