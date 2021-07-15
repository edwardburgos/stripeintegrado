import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import storeConfig from './store.js';
import { Provider } from 'react-redux';
import App from './App';
import { Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PagoExitoso from './components/pagoexitoso/PagoExitoso';

// import redux from 'redux';
const stripePromise = loadStripe('pk_test_51JCRNLFDCbU0H1ns7CpYSMEAYlRm45RB3KWkN7oPBGdfwqfcPoAnRNQxtxyyY3WBeHO0NwWB5aCVcU9uSuXFeKqs00alf7pq0J');


const store = storeConfig();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
      <Elements stripe={stripePromise}>
        <Route exact path='/' component={App}></Route>
        <Route path="/pagoexitoso" component={PagoExitoso}></Route>
        </Elements>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
