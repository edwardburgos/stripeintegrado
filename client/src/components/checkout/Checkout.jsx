
import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements } from '@stripe/react-stripe-js'; //useStripe, CardElement, useElements
import s from './Checkout.module.css'
import { useEffect, useState } from 'react';
import loadingGif from '../../images/loadingGif.gif';
import { lockClosedOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useDispatch } from 'react-redux';
import { modifycompletedPaymentInfo, modifyPaymentInfo } from '../../actions';

const ErrorMessage = ({ children }) => (
    <small className={s.error}>{children}</small>
);

export default function Checkout() {
    // const stripe = useStripe();
    // const elements = useElements();
    // const [selected, setSelected] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(false);
    const [selectedExpire, setSelectedExpire] = useState(false);
    const [selectedCvc, setSelectedCvc] = useState(false);
    // const [error, setError] = useState()
    const [errorNumber, setErrorNumber] = useState({message: 'Este campo es obligatorio'})
    const [errorExpire, setErrorExpire] = useState({message: 'Este campo es obligatorio'});
    const [errorCvc, setErrorCvc] = useState({message: 'Este campo es obligatorio'});


    const [cargadoCompleto, setCargadoCompleto] = useState(false);

    const [recordarTarjeta, setRecordarTarjeta] = useState(true);
    function recordar(e) {
        if (e.target.checked) return setRecordarTarjeta(true)
        setRecordarTarjeta(false);
    }

    const [metodoPago, setMetodoPago] = useState('tarjeta');

    const elements = useElements();
    // elements.getElement(CardNumberElement);


    function selectPayment(e) {
        if (e.target.id === 'tarjeta') return setMetodoPago('tarjeta');
        setMetodoPago('paypal')
    }

    const dispatch = useDispatch();

    // Global state of the result to show
    
    useEffect(() => {
        if (metodoPago === 'paypal') {
            dispatch(modifycompletedPaymentInfo(true))
        } else {
            if (errorNumber || errorExpire || errorCvc) {
                dispatch(modifycompletedPaymentInfo(false));
            } else {
                dispatch(modifyPaymentInfo(elements.getElement(CardNumberElement)));
                dispatch(modifycompletedPaymentInfo(true));
            }
        }
    }, [metodoPago, errorNumber, errorExpire, errorCvc, dispatch, elements])

    // useEffect(() => {
    //     if (metodoPago === 'tarjeta') {
    //         setErrorNumber({message: 'Este campo es obligatorio'});
    //         setErrorExpire({message: 'Este campo es obligatorio'});
    //         setErrorCvc({message: 'Este campo es obligatorio'});
    //     }
    // }, [metodoPago])
    
    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     await stripe.createPaymentMethod({
    //         type: 'card',
    //         card: elements.getElement(CardElement)
    //     })
    // }
    //

    // function actualizarCargado() {
    //     setCargadoCompleto(true)
    // }

    //
    
    // let card = elements.getElement('card');

    // useEffect(() => {
    //     if (elements && elements.getElement('card')) {
    //         actualizarCargado()
    //         let card = elements.getElement(CardElement);
    //         card.on('focus', function () {
    //             setSelected(true)
    //         });
    //         card.on('blur', function () {
    //             setSelected(false)
    //         })
    //     }
    // }, [elements])

    // const paymentInput = marginBottom;
    // if (errorNumber) {
    //     payment
    // } 
    
    // classNaerror ? selectedNumber ? : s.marginBottom } me={ 

    return (
        // <>
        //  {cargadoCompleto ?
        <>
            <div style={cargadoCompleto ? { display: 'block' } : { display: 'none' }}>
                <div className={s.marginBottom}>
                    <input type="radio" id="tarjeta" name="metodoPago" className={s.marginRight} onChange={e => selectPayment(e)} checked={metodoPago === 'tarjeta'} /> Tarjeta de crédito
                    <input type="radio" id="paypal" name="metodoPago" className={s.marginLeftRight} onChange={e => selectPayment(e)} checked={metodoPago === 'paypal'} /> PayPal
                </div>
                <div className={s.paymentSection}>

                    {metodoPago === 'tarjeta' ?
                        <>
                            {/* <div className={`${s.marginBottom} ${selected ? `${s.cardInput} ${s.cardInputSelected}` : `${s.cardInput}`}`}><CardElement onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} onReady={() => setCargadoCompleto('true')} onChange={e => setError(e.error)}/></div> */}
                            <label htmlFor="cardNumber" className={s.labelPaymentInput}>Número de tarjeta</label>
                            <div className={errorNumber ? selectedNumber ? `${s.cardInput} ${s.cardInputSelected} ${s.errorInput} ${s.errorInputSelected}` : `${s.cardInput} ${s.errorInput}` : selectedNumber ? `${s.cardInput} ${s.cardInputSelected} ${s.marginBottom}` : `${s.cardInput} ${s.marginBottom}` } id="cardNumber"><CardNumberElement onFocus={() => setSelectedNumber(true)} onBlur={() => setSelectedNumber(false)} onReady={() => {setCargadoCompleto('true'); setErrorNumber({message: 'Este campo es obligatorio'}); setErrorExpire({message: 'Este campo es obligatorio'}); setErrorCvc({message: 'Este campo es obligatorio'}) }} onChange={e => !e.empty ? setErrorNumber(e.error): setErrorNumber({message: 'Este campo es obligatorio'})} /></div>
                            {errorNumber && <ErrorMessage>{errorNumber.message}</ErrorMessage>}
                            <div className={s.row}>
                                <div className={s.mitadUno}>
                                    <label htmlFor="cardExpire" className={s.labelPaymentInput}>MM / AA</label>
                                    <div className={errorExpire ? selectedExpire ? `${s.cardInput} ${s.cardInputSelected} ${s.errorInput} ${s.errorInputSelected}` : `${s.cardInput} ${s.errorInput}` : selectedExpire ? `${s.cardInput} ${s.cardInputSelected} ${s.marginBottom}` : `${s.cardInput} ${s.marginBottom}` }  id="cardExpire"><CardExpiryElement options={{ placeholder: '12 / 25' }} onFocus={() => setSelectedExpire(true)} onBlur={() => setSelectedExpire(false)} onChange={e => !e.empty ?  setErrorExpire(e.error) : setErrorExpire({message: 'Este campo es obligatorio'})} /></div>
                                    {errorExpire && <ErrorMessage>{errorExpire.message}</ErrorMessage>}
                                </div>
                                <div className={s.mitadDos}>
                                    <label htmlFor="cardCvc" className={s.labelPaymentInput}>CVC</label>
                                    <div className={errorCvc ? selectedCvc ? `${s.cardInput} ${s.cardInputSelected} ${s.errorInput} ${s.errorInputSelected}` : `${s.cardInput} ${s.errorInput}` : selectedCvc ? `${s.cardInput} ${s.cardInputSelected} ${s.marginBottom}` : `${s.cardInput} ${s.marginBottom}` }  id="cardCvc"><CardCvcElement options={{ placeholder: '123' }} onFocus={() => setSelectedCvc(true)} onBlur={() => setSelectedCvc(false)} onChange={e => !e.empty ? setErrorCvc(e.error) : setErrorCvc({message: 'Este campo es obligatorio'})} /></div>
                                    {errorCvc && <ErrorMessage>{errorCvc.message}</ErrorMessage>}
                                </div>
                            </div>
                            <div className={`${s.displayBlock} ${s.marginBottom}`}>
                                <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" checked={recordarTarjeta} onChange={e => recordar(e)} /> Recordar esta tarjeta
                            </div>
                        </>
                        :
                        <p className={s.marginBottom}>Para completar la transacción, te enviaremos a los servidores seguros de PayPal.</p>
                    }
                    <div className={s.secureDescription}>

                        <IonIcon icon={lockClosedOutline} className={s.iconDumb}></IonIcon>
                        <span className={s.textDumb}>Conexión segura</span>
                    </div>
                </div>
            </div>
            <div style={!cargadoCompleto ? { display: 'block' } : { display: 'none' }} className={s.loadingGifContainer}>
                <img src={loadingGif} alt="Loading Gif" className={s.loadingGif} />
            </div>
        </>
        //         :
        //         <div>
        //             <h1>CARGANDO</h1>
        //             {/* <img src="../../images/loadingGif.gif"></img> */}
        //         </div>
        //     }
        // </>
    )
}