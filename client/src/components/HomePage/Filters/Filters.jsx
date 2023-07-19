/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { changeFilters, getAllTemperaments, resetFilters, changeOrder } from "../../../redux/actions";
import styles from "./Filters.module.css";


export const Filters = () => {
    const dispatch = useDispatch();
    const currentFilter = useSelector((state) => state.currentFilter);
    const currentOrder = useSelector((state) => state.currentOrder);
    const [tempFilter, setTempFilter] = useState(currentFilter.tempName);
    const [originFilter, setOriginFilter] = useState(currentFilter.source);
    const [order, setOrder] = useState(currentOrder);

    useEffect(() => {  //useEffect escucha cambios del componente 
        dispatch(getAllTemperaments()); //dispacth trae la info 
    }, []);

    const temps = useSelector((state) => state.getTemperaments);

    const handleTempFilterChange = (event) => {
        setTempFilter(event.target.value);
    };

    const handleOriginFilterChange = (event) => {
        setOriginFilter(event.target.value);
    };

    function handleOrderChange(event) {
        setOrder(event.target.value);
    };

    const handleApply = () => {
        dispatch(changeFilters({
            tempName: tempFilter,
            source: originFilter,
        }));
        dispatch(changeOrder(order));
    }

    const handleReset = () => {
        dispatch(resetFilters());
        setTempFilter('ALL');
        setOriginFilter('ALL');
        setOrder('A-Z');
    }

    return (
        <div className={styles.filtersContainer}>
            <select className={styles.selects} placeholder="Temperaments" onChange={handleTempFilterChange} value={tempFilter}>
                <option key="temperaments_all" value="ALL">All</option>
                <option key="temperaments_without" value="WITHOUT">Without Temperament</option>
                {temps.map((temp) =>
                    <option key={temp.id} value={temp.name.trim()}>{temp.name}</option>
                )}
            </select>
            <select className={styles.selects} placeholder="Origin" onChange={handleOriginFilterChange} value={originFilter}>
                <option key="origin_ALL" value="ALL">All</option>
                <option key="origin_API" value="API">Dogs API</option>
                <option key="origin_DB" value="DB">Database</option>
            </select>

            <select className={styles.selects} placeholder="Order by" onChange={handleOrderChange} value={order}>
                <option key="A-Z" value="A-Z">A-Z</option>
                <option key="Z-A" value="Z-A">Z-A</option>
                <option key="LIGHTER" value="LIGHTER">Less Weight</option>
                <option key="HEAVIER" value="HEAVIER">More Weight</option>
            </select>

            <button className={styles.reset} onClick={handleApply}>Apply</button>
            <button className={styles.reset} onClick={handleReset}>Reset</button>
        </div>

    )
}