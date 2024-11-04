import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51QEogtFo5lCFtFC0pcYTJ9SEfi8OlHefwUWp8BGI2fxwpKAi4kXlamGv7a4ZvdAaKZgPnTd1gEieFvIev696DPO000g76MZTop');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState('');

  // New states for amount and package details
  const [amount, setAmount] = useState(0);
  const [packageDetails, setPackageDetails] = useState({ name: '', description: '' });

  useEffect(() => {
    // Fetch package details and amount from sessionStorage
    const storedPackageName = sessionStorage.getItem('selectedPackageName');
    const storedPackageDescription = sessionStorage.getItem('selectedPackageDescription');

    // Update state with retrieved values
    if (storedPackageName && storedPackageDescription) {
      setPackageDetails({
        name: storedPackageName,
        description: storedPackageDescription,
      });
    }

    // Retrieve contactOption from sessionStorage
    const contactOption = sessionStorage.getItem('contactOption');
    if (contactOption) {
      // Set the amount based on contact option
      if (contactOption === 'chat') {
        setAmount(300); // $3 in cents
      } else if (contactOption === 'video') {
        setAmount(500); // $5 in cents
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!cardholderName.trim()) {
      toast.error("Please enter the cardholder's name");
      setLoading(false);
      return;
    }

    // Set paymentStatus to "Pending" before starting the payment process
    sessionStorage.setItem('paymentStatus', 'Pending');

    try {
      // Create PaymentIntent with the dynamic amount in cents
      const response = await axios.post('http://localhost:2003/api/payments/payment-intent', {
        amount,
        cardholderName,
      });

      const { clientSecret } = response.data;

      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardholderName,
          },
        },
      });

      if (error) {
        toast.error('Payment failed: ' + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success(`Payment of $${(amount / 100).toFixed(2)} successful! Thank you for your purchase.`, {
          position: "top-right",
          autoClose: 3000,
        });

        // Update paymentStatus to "Succeeded" after payment success
        sessionStorage.setItem('paymentStatus', paymentIntent.status);

        // Clear session storage for payment details
        sessionStorage.removeItem('paymentAmount');
        sessionStorage.removeItem('selectedPackageName');
        sessionStorage.removeItem('selectedPackageDescription');
        sessionStorage.removeItem('contactOption');

        // Retrieve current packages from local storage
        const userPackages = JSON.parse(localStorage.getItem('userPackages')) || [];

        // Create new package object
        const newPackage = {
          id: sessionStorage.getItem('selectedPackageId'),
          name: packageDetails.name,
          description: packageDetails.description,
          price: amount,
          date: new Date().toISOString(), // Store the date of purchase
        };

        // Update user packages
        userPackages.push(newPackage);

        // Save updated packages to local storage
        localStorage.setItem('userPackages', JSON.stringify(userPackages));

        // Save purchase details to the backend (if needed)
        // await axios.post('http://localhost:2003/api/packages/purchase', {
        //   userId: sessionStorage.getItem('userId'),
        //   packageId: sessionStorage.getItem('selectedPackageId'),
        //   name: packageDetails.name,
        //   description: packageDetails.description,
        //   price: amount,
        // });
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h4 className="mb-4">Enter Card Details</h4>

      {/* Cardholder Name Input Field */}
      <div className="form-group mb-3">
        <label htmlFor="cardholderName">Cardholder Name</label>
        <input
          type="text"
          id="cardholderName"
          className="form-control"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
        />
      </div>

      {/* Card Element Input */}
      <div className="form-group mb-3">
        <CardElement className="form-control" />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-100" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

const Payment = () => (
  <div className="container payment-container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 mt-5">
          <h2 className="text-center mb-4">Complete Your Payment</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </div>
);

export default Payment;
