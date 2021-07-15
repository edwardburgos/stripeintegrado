import React, { useEffect, useState } from 'react';
import s from './App.module.css';
import CartItems from './components/cartitems/CartItems';
import Countries from './components/countries/Countries';
import Checkout from './components/checkout/Checkout';
import { Link, useHistory} from 'react-router-dom'; ////useHistory, Redirect
import { useSelector } from 'react-redux';
import { Elements, useStripe, create } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PagoExitoso from './components/pagoexitoso/PagoExitoso';

const clasesPorComprar = [
  {
    id: 8,
    imagen: 'https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    nombre: 'Clase de matemáticas',
    precioDescuento: 14.30,
    precioOriginal: 16.99,
    moneda: 'USD'
  },
  {
    id: 56,
    imagen: 'https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    nombre: 'Clase de comunicación',
    precioDescuento: 14.30,
    precioOriginal: 16.99,
    moneda: 'USD'
  },
  {
    id: 63,
    imagen: 'https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    nombre: 'Clase de inglés',
    precioDescuento: 14.30,
    precioOriginal: 16.99,
    moneda: 'USD'
  }
]
const moneda = 'USD';


function App() {

  // This line connect us with Stripe

  function roundTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }
  const precioOriginal = roundTwo(clasesPorComprar.map(e => e.precioOriginal).reduce((acum, e) => acum + e));
  const total = roundTwo(clasesPorComprar.map(e => e.precioDescuento).reduce((acum, e) => acum + e));
  const descuento = roundTwo(precioOriginal - total);
  const completedPaymentInfo = useSelector(state => state.completedPaymentInfo);
  const paymentInfo = useSelector(state => state.paymentInfo);
  const dispatch = useDispatch();
  const [estadoBoton, setEstadoBoton] = useState(true)
  const [paymentId, setPaymentId] = useState('') 

  const history = useHistory()


  const stripe = useStripe();

  useEffect(() => {
    async function validacionInformacionPago () {
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: paymentInfo
      })
      if (!error) { setPaymentId(paymentMethod.id); return setEstadoBoton(false)}
      setEstadoBoton(true);
    }
    if (stripe && Object.keys(paymentInfo).length && completedPaymentInfo) {
      validacionInformacionPago()
    }
  }, [completedPaymentInfo, paymentInfo, stripe])

  // else {
  //   console.log(error.message) // CORREGIR
  // }

 

  async function handleSubmit(e) {
    e.preventDefault();
    // useStripe give us a Stripe conection
      const { data } = await axios.post('http://localhost:3001/procesarpago', {
        id: paymentId,
        amount: total * 100
      })
      if (data === 'Pago procesado exitosamente') {
        //window.location.href="/pagoexitoso";
        history.push('/pagoexitoso')
        // <Redirect push to="/pagoexitoso"></Redirect>
      }
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.left}>
          <p className={`${s.title} ${s.marginBottom}`}>Pagar</p>
          <p className={s.marginBottom}>Dirección de facturación</p>
          <div className={s.marginBottom}><Countries width={'100%'} /></div>
          {/* The elements inside Elements have access to Stripe */}
            <Checkout />
          <p className={`${s.title} ${s.marginBottom}`}>Detalles del pedido</p>
          <CartItems clasesPorComprar={clasesPorComprar} />
        </div>
        <div className={s.right}>
          <form onSubmit={handleSubmit}>
            <p className={`${s.title} ${s.marginBottom}`}>Resumen</p>
            <div className={s.details}>
              <div>
                <span className={s.label}>Precio original: </span>
                <span className={s.moneda}>{moneda}</span>
                <span className={s.precio}>{precioOriginal.toFixed(2)}</span>
              </div>
              <div>
                <span className={s.label}>Cupón de descuento: </span>
                <span className={s.moneda}>{moneda}</span>
                <span className={s.precio}>-{descuento.toFixed(2)}</span>
              </div>
            </div>
            <div className={s.totalContainer}>
              <span className={s.labelTotal}>Total: </span>
              <span className={s.monedaTotal}>{moneda}</span>
              <span className={s.precioTotal}>{total.toFixed(2)}</span>
            </div>
            <p>
              Tus Clases Virtuales está obligado por ley a recaudar los impuestos sobre las transacciones
              de las compras realizadas en determinadas jurisdicciones fiscales.
            </p>
            <p>
              Al completar la compra, aceptas estas <Link to={`condicionesdeuso`} style={{ textDecoration: 'none', fontWeight: 600 }}>Condiciones de uso</Link>
            </p>
            <input type='submit' className={s.payButton} disabled={estadoBoton} value='Pagar' />
          </form>
        </div>
      </div>
    </>

  );
}

export default App;
