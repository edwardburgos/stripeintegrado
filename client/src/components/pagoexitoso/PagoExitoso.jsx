import React from 'react';
import thanks from '../../images/thanks.svg';
import s from './PagoExitoso.module.css';

export default function PagoExitoso () {
    return (
    <div className={s.container}>
        <h1 className={s.title}>GRACIAS POR TU COMPRA</h1>
        <img src={thanks} alt='Gracias por tu compra' className={s.thanksImage}></img>
        <div>
            
        </div>
    </div>
    )
}