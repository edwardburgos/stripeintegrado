const initialState = {
  completedPaymentInfo: false,
  paymentInfo: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'MODIFY_COMPLETED_PAYMENT_INFO':
      return {
        ...state,
        completedPaymentInfo: action.completedPaymentInfo
      }
    case 'MODIFY_PAYMENT_INFO':
      return {
        ...state,
        paymentInfo: action.paymentInfo
      }
    default:
      return { ...state }
  }
}