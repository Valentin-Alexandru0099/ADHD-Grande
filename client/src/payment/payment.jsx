import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkoutForm";
import axios from "axios";
import { BASE_API_URL } from "../App";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51L8sK5LlNBHeDk8KM3VJKca6m2pL0CBSFKHEGK3OVTRCxpTfhPTwBAAb3yqDS4sZpBbZJptFCAY9JGjZUaiw58j500ADxj6Wl5");


export default function PaymentPage() {
    const queryParams = new URLSearchParams(window.location.search);

    const [clientSecret, setClientSecret] = useState("");
    const [paymentData, setPaymentData] = useState({
        value: queryParams.get('value'),
        currency: queryParams.get('currency')
    });

    async function getPaymentIntend() {
        await axios.post(BASE_API_URL + 'payment/create-payment-intent', paymentData)
            .then(response => {
                console.log(response.data)
                setClientSecret(response.data.clientSecret)
            });
    };

    useEffect(() => {
        getPaymentIntend();
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
};