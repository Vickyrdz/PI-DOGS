import React from "react";
import styles from "./Formpage.module.css";
import decoImg from "../../../src/assets/Captura de Pantalla 2023-07-14 a la(s) 15.37.49.png"
import { Backtohome } from "../Backtohome/Backtohome";


// Nombre.
// -  Altura **(diferenciar entre altura mínima y máxima de la raza)**.
// -  Peso **(diferenciar entre peso mínimo y máximo de la raza)**.
// -  Años de vida.
// -  Posibilidad de seleccionar/agregar varios temperamentos en simultáneo.
// -  Botón para crear la nueva raza.

export const Formpage = () => {
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
                        <div>
                            <h2>Name</h2>
                            <input type="text" />
                        </div>
                        <div>
                            <h2>Height</h2>
                            <input placeholder="Min height" type="number" />
                            <input placerholder="Max height" type="number" />

                        </div>
                        <div>
                            <h2>Weight</h2>
                            <input placeholder="Min weight" type="number" />
                            <input placerholder="Max weight" type="number" />
                        </div>
                        <div>
                            <h2>Life Span</h2>
                            <input type="number" />
                        </div>
                        <div>
                            <h2>Temperaments</h2>
                            <option value=""></option>
                        </div>
                    </div>
                </div>
            </div>
            <button className={styles.button}>Create</button>
        </div>
    )
}