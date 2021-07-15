import s from './CartItem.module.css';
// import {Link} from 'react-router-dom';
import React from 'react';

export default function CardItem({id, imagen, nombre, precioDescuento, precioOriginal, moneda}) {
  return (
    <div className={s.card}>
      <img src={imagen} alt={nombre} className={s.cover}/>
      {/* <Link to={`/detail/${id}`} style={{ textDecoration: 'none' }}><p className={s.title}>{nombre}</p></Link> */}
      <p className={s.title}>{nombre}</p>
      <div className={s.prices}>
        <div>
          <span className={s.moneda}>{moneda}</span>
          <span className={s.precio}>{precioDescuento.toFixed(2)}</span>
        </div>
        <div>
          <span className={s.moneda}>{moneda}</span>
          <span className={s.precioOriginal}>{precioOriginal.toFixed(2)}</span>
        </div>
      </div>
      {/* <div className={s.temperaments}>
      <span className={s.label}>Temperaments:</span> 
      <p>{temperament}</p>
      </div> */}
    </div>
  );
}

