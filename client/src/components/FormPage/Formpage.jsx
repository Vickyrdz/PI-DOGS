import React from "react";
import styles from "./Formpage.module.css";
import decoImg from "../../../src/assets/Captura de Pantalla 2023-07-14 a la(s) 15.37.49.png"
import { Backtohome } from "../Backtohome/Backtohome";
import { createNewDog } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Formpage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //EStados
    const [name, setName] = useState("");
    const [minHeight, setMinHeight] = useState("");
    const [maxHeight, setMaxHeight] = useState("");
    const [minWeight, setMinWeight] = useState("");
    const [maxWeight, setMaxWeight] = useState("");
    const [life, setLife] = useState("");
    const [temperaments, setTemperaments] = useState("");
    const [image, setImage] = useState("");


    // Este es para que una vez creado te dirija al detalle del perro recien creado
    const onDogCreated = (newDogId) => {
        alert("Your dogs was successfully created");
        navigate(`/detail/${newDogId}`);
    }

    // mandar siemre y cuando ningun espacio este vacio 
    const handleSubmit = (event) => {
        //para que no salte de pagina
        event.preventDefault();
        if (name.length < 3) return;
        if (!minHeight && !maxHeight) return;
        if (!minWeight && !maxWeight) return;
        if (!life && !temperaments && !image) return;


        dispatch(
            createNewDog({
                name,
                min_height: minHeight, 
                max_height: maxHeight, 
                min_weight: minWeight, 
                max_weight: maxWeight, 
                temperaments: temperaments,
                life_span: life,
                image
            }, onDogCreated)
        )
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    
    };
    const handleMinHeightChange = (event) => {
        setMinHeight(event.target.value);

    };
    const handleMaxHeightChange = (event) => {
        setMaxHeight(event.target.value);

    };
    const handleMinWeightChange = (event) => {
        setMinWeight(event.target.value);

    };
    const handleMaxWeightChange = (event) => {
        setMaxWeight(event.target.value);

    };
    const handleLifeChange = (event) => {
        setLife(event.target.value);

    };
    const handleTemperamentsChange = (event) => {
        setTemperaments(event.target.value);

    };
    const handleImageChange = (event) => {
        setImage(event.target.value);

    };

    //disabled del button
    const someFieldEmpty = !name || !minHeight || !maxHeight || !minWeight || !maxWeight || !life || !temperaments || !image;

    //validaciones de los inputs
    const inputInvalidName = !name;
    const inputInvalidHeight = !minHeight || !maxHeight;
    const inputInvalidWeight = !minWeight || !maxWeight;
    const inputInvalidLife = !life;
    const inputInvalidTemperaments = !temperaments;
    const inputInvalidImage = !image; 

    return (
        <div className={styles.formpageContainer}>
            <Backtohome />
            <h1 className={styles.title}>¡Create your dog!</h1>

            <div className={styles.cardContainer}>
                <div className={styles.right}>
                    <img className={styles.decoImg} src={decoImg} alt="" />
                </div>
                <div>
                    <div className={styles.left}>
                        <div className={styles.blockContainerName}>
                            <h2 className={styles.text}>Name</h2>
                            <input className={styles.inputLarge}  type="text" value={name && name} placeholder="Insert name" onChange={handleNameChange} />
                            <p className={styles.p}>{inputInvalidName ? ("This field is required") : " "}</p>
                        </div>
                        <div className={styles.blockContainerH}>
                            <h2 className={styles.text}>Height</h2>
                            <input className={styles.inputSmall} placeholder="Min height" type="number" value={minHeight && minHeight} onChange={handleMinHeightChange} />
                            <input className={styles.inputLeft} placeholder="Max height" type="number" value={maxHeight && maxHeight} onChange={handleMaxHeightChange} />
                            <p className={styles.p}>{inputInvalidHeight && ("Both fields are required")}</p>

                        </div>
                        <div className={styles.blockContainerW}>
                            <h2 className={styles.text}>Weight</h2>
                            <input className={styles.inputSmall} placeholder="Min weight" type="number" value={minWeight && minWeight} onChange={handleMinWeightChange} />
                            <input className={styles.inputLeft} placeholder="Max weight" type="number" value={maxWeight && maxWeight} onChange={handleMaxWeightChange} />
                            <p className={styles.p}>{inputInvalidWeight&& ("Both fields are required")}</p>
                        </div>
                        <div className={styles.blockContainerLife}>
                            <h2 className={styles.text}>Life Span</h2>
                            <input className={styles.inputLarge} placeholder="Only numbers" type="number" value={life && life} onChange={handleLifeChange} />
                            <p className={styles.p}>{inputInvalidLife && ("This field is required")}</p>

                        </div>
                        <div className={styles.blockContainerTemp}>
                            <h2 className={styles.text}>Temperaments</h2>
                            <input className={styles.inputLarge} type="text" placeholder="Example: Funny, obedient, cuddly"  value={temperaments && temperaments} onChange={handleTemperamentsChange}/>
                            <p className={styles.p}>{inputInvalidTemperaments && ("This field is required")}</p>

                        </div>
                        <div className={styles.blockContainerImage}>
                            <h2 className={styles.text}>Image- Use URL</h2>
                            <input className={styles.inputLarge} value={image && image} type="url" onChange={handleImageChange} />
                            <p className={styles.p}>{inputInvalidImage && ("This field is required")}</p>

                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className={styles.button} disabled={someFieldEmpty } onClick={handleSubmit}>Create</button>
        </div>
    )
}