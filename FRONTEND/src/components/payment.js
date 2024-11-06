
// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// const stripePromise = loadStripe('pk_test_51QEogtFo5lCFtFC0pcYTJ9SEfi8OlHefwUWp8BGI2fxwpKAi4kXlamGv7a4ZvdAaKZgPnTd1gEieFvIev696DPO000g76MZTop');

// function PaymentForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const { data } = await axios.post('http://localhost:2003/create-payment-intent', { amount: 1000, currency: 'usd' });
//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: { card: elements.getElement(CardElement) },
//       });
//       if (result.error) setError(result.error.message);
//       else if (result.paymentIntent.status === 'succeeded') setSuccess(true);
//     } catch (error) {
//       setError('Payment failed, please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>Pay</button>
//       {error && <div>{error}</div>}
//       {success && <div>Payment successful!</div>}
//     </form>
//   );
// }

// function PaymentPage() {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//     </Elements>
//   );
// }

// export default PaymentPage;