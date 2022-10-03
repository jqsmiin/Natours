export const bookTour = async tourId => {
    const stripe = Stripe('pk_test_51LmVwsK3bT010ANy16pNw8COqp5RZIDQXDgies12NiTRN1P7tJgOyqCF1vza8zibb5JsI0eKeLW1aHKokAob39HA00bwN0qMew')
    try {
        // Get checkout session from API
        const res = await fetch(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`)
        const session = await res.json()
        console.log(session)
        // Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.session.id
        })
    } catch (err) {
        console.log(err)
    }
}