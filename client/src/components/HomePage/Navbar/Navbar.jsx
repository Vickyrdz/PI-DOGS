/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from './Navbar.module.css'
import { NavLink, Link, useNavigate } from "react-router-dom";
import NavImg from "../../../assets/landingDog.png";
import {useEffect } from "react";
import { useDispatch } from 'react-redux';
import { changeLoading, findDogsByName } from "../../../redux/actions";
import { useState } from "react";


export default function Navbar() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {  //useEffect escucha cambios del componente 
      // si no es vacío
      if (searchValue) {
        navigate('/home'); //esto es por si estamos en detail por ejemplo y queremos buscar igual, nos dirige a la home
        dispatch(changeLoading(true)); //
        dispatch(findDogsByName(searchValue)); //dispara la info que encontró con el criterio de busqueda 
        setInputValue(''); //vuelve a vaciarse el input luego de buscar
      }
      
      // si quiero interpretar el criterio como id
      // if (searchValue){ navigate(`/detail/${searchValue}`) }
    }, [searchValue]);

  
    //cuando escucha el evento actualiza el estado del input con el valor recibido
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    //
    const handleSearch = () => {
      setSearchValue(inputValue);
    };

   return (
     <nav className={styles.navbar}>
       <Link to={"/home"}>
         <img className={styles.navImg} src={NavImg} alt="" />
       </Link>
       <NavLink className={styles.create} to={"/formpage"}>Create your Dog</NavLink>
       <div className={styles.searchbarContainer}>
         <input className={styles.input} type="search" value={inputValue} onChange={handleInputChange} />
         <button className={styles.button} onClick={handleSearch}>Search</button>
       </div>

     </nav>
   );
}
 