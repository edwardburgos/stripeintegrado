import CartItem from '../cartitem/CartItem';
import React from 'react';

export default function CartItems({ clasesPorComprar }) {
  return (
    <div>
      {
        clasesPorComprar.map((e, i) => <CartItem key={i} id={e.id} imagen={e.imagen} nombre={e.nombre} precioDescuento={e.precioDescuento} precioOriginal={e.precioOriginal} moneda={e.moneda}></CartItem>)
      }
    </div>
  );
}
