import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {
    MDBContainer,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
} from "mdb-react-ui-kit";
import { useParams } from "react-router";
import { BASE_API_URL } from "../App";
import axios from "axios";


export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const { id } = useParams();
    const queryParams = new URLSearchParams(window.location.search);


    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);
        addPayment();
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000/campaigns/campaign/"
                    + id,
            },
        });
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    async function addPayment() {
        await axios.post(BASE_API_URL +
            "payment/add-payment/" +
            localStorage.getItem("userId") +
            "/" + id +
            "/" + queryParams.get("campaignUserId"),

            {
                value: queryParams.get("value"),
                currency: queryParams.get("currency"),
            });
    };

    return (
        <>
            <MDBContainer style={{ marginTop: '1%', marginBottom: '1%' }}>
                <MDBCard alignment='center'>
                    <MDBCardHeader>Checkout Card</MDBCardHeader>
                    <MDBCardBody>
                        <form id="payment-form" onSubmit={handleSubmit} style={{ textAlign: 'center', margin: '1%' }}>
                            <PaymentElement id="payment-element" />
                            <MDBBtn color="success" disabled={isLoading || !stripe || !elements} id="submit" style={{ margin: '1%' }}>
                                <span id="button-text">
                                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                                </span>
                            </MDBBtn>
                            {/* Show any error or success messages */}
                            {message && <div id="payment-message">{message}</div>}
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </>
    );
};