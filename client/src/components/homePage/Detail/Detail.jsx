import React from "react";
import {useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getDogById } from "../../../redux/actions";

export default function Detail() {
    const params = useParams();
    const dispatch = useDispatch();

    // useSelector sirve para acceder a una parte del estado de redux
    // es lo mismo que hacer mapStateToProps y recibir allDogs como prop en listado
    const dogDetail = useSelector((state) => state.dogDetail);
    const dogDetailError = useSelector((state) => state.dogDetailError);

    useEffect(() => {  //useEffect escucha cambios del componente 
        dispatch(getDogById(params.id)); //dispacth trae la info 
    }, []);

    if (dogDetailError) return <div>not found</div>

    if (dogDetail === null) return null;

    const heightToDisplay = typeof height === 'object' ? dogDetail.height.imperial : dogDetail.height;
    const weightToDisplay = typeof weight === 'object' ? dogDetail.weight.imperial : dogDetail.weight;
    const imageToDisplay = typeof image === 'object' ? dogDetail.image.url : dogDetail.image;

    return (
        <div>
            <h1>{dogDetail.name}</h1>
            <div>{dogDetail.image}</div>
            <h1>{dogDetail.id}</h1>
            <h2>{dogDetail.temperament}</h2>
            <span>{heightToDisplay}</span>
            <span>{weightToDisplay}</span>
            <span>{imageToDisplay}</span>

        </div>
    )
}