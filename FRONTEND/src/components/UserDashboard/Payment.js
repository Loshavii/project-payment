// // import React, { useState, useEffect } from 'react';
// // import { loadStripe } from '@stripe/stripe-js';
// // import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// // import axios from 'axios';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // // Initialize Stripe
// // const stripePromise = loadStripe('pk_test_51QEogtFo5lCFtFC0pcYTJ9SEfi8OlHefwUWp8BGI2fxwpKAi4kXlamGv7a4ZvdAaKZgPnTd1gEieFvIev696DPO000g76MZTop');

// // const CheckoutForm = () => {
// //   const stripe = useStripe();
// //   const elements = useElements();
// //   const [loading, setLoading] = useState(false);
// //   const [cardholderName, setCardholderName] = useState('');
// //   const [amount, setAmount] = useState(0);
// //   const [packageDetails, setPackageDetails] = useState({ name: '', description: '' });

// //   useEffect(() => {
// //     const storedPackageName = sessionStorage.getItem('selectedPackageName');
// //     const storedPackageDescription = sessionStorage.getItem('selectedPackageDescription');
// //     if (storedPackageName && storedPackageDescription) {
// //       setPackageDetails({
// //         name: storedPackageName,
// //         description: storedPackageDescription,
// //       });
// //     }

// //     const contactOption = sessionStorage.getItem('contactOption');
// //     if (contactOption) {
// //       if (contactOption === 'chat') {
// //         setAmount(300); // $3 in cents
// //       } else if (contactOption === 'video') {
// //         setAmount(500); // $5 in cents
// //       }
// //     }
// //   }, []);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     setLoading(true);

// //     if (!cardholderName.trim()) {
// //       toast.error("Please enter the cardholder's name");
// //       setLoading(false);
// //       return;
// //     }

// //     sessionStorage.setItem('paymentStatus', 'Pending');

// //     try {
// //       const response = await axios.post('http://localhost:2003/api/payments/payment-intent', {
// //         amount,
// //         cardholderName,
// //       });

// //       const { clientSecret, paymentIntentId } = response.data;

// //       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
// //         payment_method: {
// //           card: elements.getElement(CardElement),
// //           billing_details: {
// //             name: cardholderName,
// //           },
// //         },
// //       });

// //       if (error) {
// //         toast.error('Payment failed: ' + error.message);
// //       } else if (paymentIntent.status === 'succeeded') {
// //         toast.success(`Payment of $${(amount / 100).toFixed(2)} successful! Thank you for your purchase.`, {
// //           position: "top-right",
// //           autoClose: 3000,
// //         });

// //         sessionStorage.setItem('paymentStatus', paymentIntent.status);

// //         // Update paymentStatus in MongoDB
// //         await axios.patch('http://localhost:2003/api/payments/update-payment-status', {
// //           paymentIntentId: paymentIntent.id,
// //           status: 'Succeeded',
// //         });

// //         sessionStorage.removeItem('paymentAmount');
// //         sessionStorage.removeItem('selectedPackageName');
// //         sessionStorage.removeItem('selectedPackageDescription');
// //         sessionStorage.removeItem('contactOption');

// //         const userPackages = JSON.parse(localStorage.getItem('userPackages')) || [];

// //         const newPackage = {
// //           id: sessionStorage.getItem('selectedPackageId'),
// //           name: packageDetails.name,
// //           description: packageDetails.description,
// //           price: amount,
// //           date: new Date().toISOString(),
// //         };

// //         userPackages.push(newPackage);
// //         localStorage.setItem('userPackages', JSON.stringify(userPackages));
// //       }
// //     } catch (err) {
// //       toast.error('An error occurred. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="payment-form">
// //       <h4 className="mb-4">Enter Card Details</h4>

// //       {/* Cardholder Name Input Field */}
// //       <div className="form-group mb-3">
// //         <label htmlFor="cardholderName">Cardholder Name</label>
// //         <input
// //           type="text"
// //           id="cardholderName"
// //           className="form-control"
// //           value={cardholderName}
// //           onChange={(e) => setCardholderName(e.target.value)}
// //           required
// //         />
// //       </div>

// //       {/* Card Element Input */}
// //       <div className="form-group mb-3">
// //         <CardElement className="form-control" />
// //       </div>

// //       {/* Submit Button */}
// //       <button type="submit" className="btn btn-primary w-100" disabled={!stripe || loading}>
// //         {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
// //       </button>
// //     </form>
// //   );
// // };

// // const Payment = () => (
// //   <div className="container payment-container">
// //     <div className="row justify-content-center">
// //       <div className="col-md-6">
// //         <div className="card p-4 mt-5">
// //           <h2 className="text-center mb-4">Complete Your Payment</h2>
// //           <Elements stripe={stripePromise}>
// //             <CheckoutForm />
// //           </Elements>
// //         </div>
// //       </div>
// //     </div>
// //     <ToastContainer
// //       position="top-center"
// //       autoClose={5000}
// //       hideProgressBar={false}
// //       newestOnTop={false}
// //       closeOnClick
// //       rtl={false}
// //       pauseOnFocusLoss
// //       draggable
// //       pauseOnHover
// //     />
// //   </div>
// // );
// // const stripe = useStripe();
// //   const elements = useElements();
// //   const [loading, setLoading] = useState(false);
// //   const [cardholderName, setCardholderName] = useState('');
// //   const [amount, setAmount] = useState(0);
// //   const [packageDetails, setPackageDetails] = useState({ name: '', description: '' });

// //   useEffect(() => {
// //     const storedPackageName = sessionStorage.getItem('selectedPackageName');
// //     const storedPackageDescription = sessionStorage.getItem('selectedPackageDescription');
// //     if (storedPackageName && storedPackageDescription) {
// //       setPackageDetails({
// //         name: storedPackageName,
// //         description: storedPackageDescription,
// //       });
// //     }

// //     const contactOption = sessionStorage.getItem('contactOption');
// //     if (contactOption) {
// //       setAmount(contactOption === 'chat' ? 300 : 500); // $3 or $5 in cents
// //     }
// //   }, []);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     setLoading(true);

// //     if (!cardholderName.trim()) {
// //       toast.error("Please enter the cardholder's name");
// //       setLoading(false);
// //       return;
// //     }

// //     const userEmail = sessionStorage.getItem('userEmail'); // Retrieve the email from session storage
// //     sessionStorage.setItem('paymentStatus', 'Pending');

// //     try {
// //       // Create a payment intent
// //       const response = await axios.post('http://localhost:2003/api/payments/payment-intent', {
// //         amount,
// //         cardholderName,
// //       });

// //       const { clientSecret, paymentIntentId } = response.data;

// //       // Confirm card payment
// //       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
// //         payment_method: {
// //           card: elements.getElement(CardElement),
// //           billing_details: { name: cardholderName },
// //         },
// //       });

// //       if (error) {
// //         toast.error('Payment failed: ' + error.message);
// //       } else if (paymentIntent.status === 'succeeded') {
// //         toast.success(`Payment of $${(amount / 100).toFixed(2)} successful! Thank you for your purchase.`, {
// //           position: "top-right",
// //           autoClose: 3000,
// //         });

// //         sessionStorage.setItem('paymentStatus', paymentIntent.status);

// //         // Save payment details in MongoDB, including the user email
// //         await axios.patch('http://localhost:2003/api/payments/update-payment-status', {
// //           paymentIntentId: paymentIntent.id,
// //           status: 'Succeeded',
// //           email: userEmail,  // Include email in MongoDB update
// //         });

// //         sessionStorage.removeItem('paymentAmount');
// //         sessionStorage.removeItem('selectedPackageName');
// //         sessionStorage.removeItem('selectedPackageDescription');
// //         sessionStorage.removeItem('contactOption');

// //         const userPackages = JSON.parse(localStorage.getItem('userPackages')) || [];
// //         const newPackage = {
// //           id: sessionStorage.getItem('selectedPackageId'),
// //           name: packageDetails.name,
// //           description: packageDetails.description,
// //           price: amount,
// //           date: new Date().toISOString(),
// //         };

// //         userPackages.push(newPackage);
// //         localStorage.setItem('userPackages', JSON.stringify(userPackages));
// //       }
// //     } catch (err) {
// //       toast.error('An error occurred. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="payment-form">
// //       <h4 className="mb-4">Enter Card Details</h4>

// //       {/* Cardholder Name Input Field */}
// //       <div className="form-group mb-3">
// //         <label htmlFor="cardholderName">Cardholder Name</label>
// //         <input
// //           type="text"
// //           id="cardholderName"
// //           className="form-control"
// //           value={cardholderName}
// //           onChange={(e) => setCardholderName(e.target.value)}
// //           required
// //         />
// //       </div>

// //       {/* Card Element Input */}
// //       <div className="form-group mb-3">
// //         <CardElement className="form-control" />
// //       </div>

// //       {/* Submit Button */}
// //       <button type="submit" className="btn btn-primary w-100" disabled={!stripe || loading}>
// //         {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
// //       </button>
// //     </form>
// //   );
// // };

// // const Payment = () => (
// //   <div className="container payment-container">
// //     <div className="row justify-content-center">
// //       <div className="col-md-6">
// //         <div className="card p-4 mt-5">
// //           <h2 className="text-center mb-4">Complete Your Payment</h2>
// //           <Elements stripe={stripePromise}>
// //             <CheckoutForm />
// //           </Elements>
// //         </div>
// //       </div>
// //     </div>
// //     <ToastContainer
// //       position="top-center"
// //       autoClose={5000}
// //       hideProgressBar={false}
// //       newestOnTop={false}
// //       closeOnClick
// //       rtl={false}
// //       pauseOnFocusLoss
// //       draggable
// //       pauseOnHover
// //     />
// //   </div>
// // );

// // export default Payment;
// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // Initialize Stripe
// const stripePromise = loadStripe('pk_test_51QEogtFo5lCFtFC0pcYTJ9SEfi8OlHefwUWp8BGI2fxwpKAi4kXlamGv7a4ZvdAaKZgPnTd1gEieFvIev696DPO000g76MZTop');
// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [cardholderName, setCardholderName] = useState('');
//   const [amount, setAmount] = useState(0);
//   const [packageDetails, setPackageDetails] = useState({ name: '', description: '' });

//   useEffect(() => {
//     const storedPackageName = sessionStorage.getItem('selectedPackageName');
//     const storedPackageDescription = sessionStorage.getItem('selectedPackageDescription');
//     if (storedPackageName && storedPackageDescription) {
//       setPackageDetails({
//         name: storedPackageName,
//         description: storedPackageDescription,
//       });
//     }
//     const contactOption = sessionStorage.getItem('contactOption');
//     if (contactOption) {
//       setAmount(contactOption === 'chat' ? 300 : 500); // $3 or $5 in cents
//     }
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     if (!cardholderName.trim()) {
//       toast.error("Please enter the cardholder's name");
//       setLoading(false);
//       return;
//     }
//     // Retrieve userId with the "id-" prefix
//    // Modify to send just the ID without the 'id-' prefix to the backend
// const userId = sessionStorage.getItem('id'); // Directly get the ID from sessionStorage

// if (!userId) {
//   toast.error("User information is missing. Please log in again.");
//   setLoading(false);
//   return;
// }

// sessionStorage.setItem('paymentStatus', 'Pending');

// try {
//   // Create a payment intent
//   const response = await axios.post('http://localhost:2003/api/payments/payment-intent', {
//     amount,
//     cardholderName,
//     userId, // Send raw userId without 'id-' prefix
//   });
//       const { clientSecret, paymentIntentId } = response.data;
      
//       // Confirm card payment
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: { name: cardholderName },
//         },
//       });
      
//       if (error) {
//         toast.error('Payment failed: ' + error.message);
//       } else if (paymentIntent.status === 'succeeded') {
//         toast.success(`Payment of $${(amount / 100).toFixed(2)} successful! Thank you for your purchase.`, {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         sessionStorage.setItem('paymentStatus', paymentIntent.status);
//         // Save payment details in MongoDB, using the prefixed userId from sessionStorage
//         await axios.patch('http://localhost:2003/api/payments/update-payment-status', {
//           paymentIntentId: paymentIntent.id,
//           status: 'Succeeded',
//           userId: userId, // Use the prefixed userId
//         });

//         // Clean up session and local storage
//         sessionStorage.removeItem('paymentAmount');
//         sessionStorage.removeItem('selectedPackageName');
//         sessionStorage.removeItem('selectedPackageDescription');
//         sessionStorage.removeItem('contactOption');
//         const userPackages = JSON.parse(localStorage.getItem('userPackages')) || [];
//         const newPackage = {
//           id: sessionStorage.getItem('selectedPackageId'),
//           name: packageDetails.name,
//           description: packageDetails.description,
//           price: amount,
//           date: new Date().toISOString(),
//         };
//         userPackages.push(newPackage);
//         localStorage.setItem('userPackages', JSON.stringify(userPackages));
//       }
//     } catch (err) {
//       toast.error('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="payment-form">
//       <h4 className="mb-4">Enter Card Details</h4>
//       <div className="form-group mb-3">
//         <label htmlFor="cardholderName">Cardholder Name</label>
//         <input
//           type="text"
//           id="cardholderName"
//           className="form-control"
//           value={cardholderName}
//           onChange={(e) => setCardholderName(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group mb-3">
//         <CardElement className="form-control" />
//       </div>
//       <button type="submit" className="btn btn-primary w-100" disabled={!stripe || loading}>
//         {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
//       </button>
//     </form>
//   );
// };

// const Payment = () => (
//   <div className="container payment-container">
//     <div className="row justify-content-center">
//       <div className="col-md-6">
//         <div className="card p-4 mt-5">
//           <h2 className="text-center mb-4">Complete Your Payment</h2>
//           <Elements stripe={stripePromise}>
//             <CheckoutForm />
//           </Elements>
//         </div>
//       </div>
//     </div>
//     <ToastContainer
//       position="top-center"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//     />
//   </div>
// );

// export default Payment;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/UserDashboard.css';

const UserDashboard = () => {
  const [paymentDetails, setPaymentDetails] = useState(null); // State to hold payment details
  const [paymentStatus, setPaymentStatus] = useState(null); // Payment status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const userId = sessionStorage.getItem('id'); // Get userId from sessionStorage
        const token = sessionStorage.getItem('token'); // Get token from sessionStorage

        if (userId && token) {
          // Fetch payment details using the userId
          const response = await axios.get(`http://localhost:2003/api/payments/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          // Set the payment details if found
          setPaymentDetails(response.data);
          setPaymentStatus(response.data.paymentStatus); // Optionally set the payment status
        } else {
          navigate('/loginuser'); // Redirect to login if no userId or token
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    fetchPaymentData();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="payment-status-section">
          <h4>Payment Status:</h4>
          <p className={`payment-status ${paymentStatus?.toLowerCase()}`}>
            {paymentStatus === 'Succeeded'
              ? 'Payment completed successfully'
              : paymentStatus === 'requires_payment_method'
              ? 'Payment method required'
              : 'No payment made or status unknown'}
          </p>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h2>My Dashboard</h2>
        </header>

        <section className="payment-details-section">
          {paymentDetails ? (
            <>
              <h3>Payment Details:</h3>
              <p><strong>Payment Intent ID:</strong> {paymentDetails.paymentIntentId}</p>
              <p><strong>Amount:</strong> ${paymentDetails.amount / 100}</p> {/* Assuming amount is in cents */}
              <p><strong>Currency:</strong> {paymentDetails.currency}</p>
              <p><strong>Payment Status:</strong> {paymentDetails.paymentStatus}</p>
              <p><strong>Payment Date:</strong> {new Date(paymentDetails.createdAt).toLocaleDateString()}</p>
            </>
          ) : (
            <p>No payment details found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;

