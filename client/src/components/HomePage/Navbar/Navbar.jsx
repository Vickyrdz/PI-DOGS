import React from "react";
import styles from './Navbar.module.css'
import { NavLink, Link, useNavigate } from "react-router-dom";
import NavImg from "../../../assets/landingDog.png";
import {useEffect } from "react";
import { useDispatch } from 'react-redux';
import { findDogsByName } from "../../../redux/actions";
import { useState } from "react";


export default function Navbar() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {  //useEffect escucha cambios del componente 
      // si no es vacío
      if (searchValue) {
        navigate('/home'); //esto es por si estamos en detail por ejemplo y queremos buscar igual 
        dispatch(findDogsByName(searchValue)); //dispara la info que encontró con el criterio de busqueda 
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
       <NavLink to={"/formpage"}>
         <span className={styles.create}>Create Your Dog</span>
       </NavLink>
       <div className={styles.searchbarContainer}>
         <input className={styles.input} type="search" value={inputValue} onChange={handleInputChange} />
         <button className={styles.button} onClick={handleSearch}>Search</button>
       </div>

     </nav>
   );
}
 