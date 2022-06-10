import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_API_URL } from "../App";

export default function PaymentSetter() {

    const { id, value, currency } = useParams();
    let navigate = useNavigate();
    console.log(id)
    console.log(value)
    console.log(currency)


    async function addPayment() {
        await axios.post(BASE_API_URL + "payment/add-payment/" + localStorage.getItem("userId") + "/" + id,
            {
                value: value,
                currency: currency
            }).then(navigate("/campaigns/campaign/"+ id))
    };

    useEffect(() => {
        addPayment();
    }, [])
};