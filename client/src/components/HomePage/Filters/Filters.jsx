import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { changeFilters, getAllTemperaments, resetFilters, changeSecondaryOrder, changePrimaryOrder } from "../../../redux/actions";
import { useSelector } from "react-redux";
import styles from "./Filters.module.css";


export const Filters = () => {
    const dispatch = useDispatch();
    const [tempFilter, setTempFilter] = useState('ALL');
    const [originFilter, setOriginFilter] = useState('ALL');
    const [primaryOrder, setPrimaryOrder] = useState('A-Z');
    const [secondaryOrder, setSecondaryOrder] = useState('LIGHTER');

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

    function handlePrimaryOrderChange(event) {
        setPrimaryOrder(event.target.value);
    };

    function handleSecondaryOrderChange(event) {
        setSecondaryOrder(event.target.value);
    };

    const handleApply = () => {
        dispatch(changeFilters({
            tempName: tempFilter,
            source: originFilter,
        }));
        dispatch(changePrimaryOrder(primaryOrder));
        dispatch(changeSecondaryOrder(secondaryOrder));
    }

    const handleReset = () => {
        dispatch(resetFilters());
        setTempFilter('ALL');
        setOriginFilter('ALL');
        setPrimaryOrder('A-Z');
        setPrimaryOrder('LIGHTER');
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

            <select className={styles.selects} placeholder="Order by" onChange={handlePrimaryOrderChange} value={primaryOrder}>
                <option key="A-Z" value="A-Z">A-Z</option>
                <option key="Z-A" value="Z-A">Z-A</option>
            </select>

            <select className={styles.selects} placeholder="Order by" onChange={handleSecondaryOrderChange} value={secondaryOrder}>
                <option key="LIGHTER" value="LIGHTER">Less Weight</option>
                <option key="HEAVIER" value="HEAVIER">More Weight</option>
            </select>

            <button className={styles.reset} onClick={handleApply}>Apply</button>
            <button className={styles.reset} onClick={handleReset}>Reset</button>
        </div>

    )
}