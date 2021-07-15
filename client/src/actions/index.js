export function modifycompletedPaymentInfo(completedPaymentInfo) {
    return {
        type: 'MODIFY_COMPLETED_PAYMENT_INFO',
        completedPaymentInfo
    }
}

export function modifyPaymentInfo(paymentInfo) {
    return {
        type: 'MODIFY_PAYMENT_INFO',
        paymentInfo
    }
}