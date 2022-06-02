import { Button } from "react-bootstrap";
import "./campaignForm.css";
import axios from "axios";
import { BASE_API_URL } from "../App";
import { useNavigate } from "react-router";

export default function CampaignForm() {

    let navigate = useNavigate();
    const minAmount = 1000;
    const warningStyle = "border: solid 1px red;";
    const normalStyle = "border: solid 1px black";
    const message = "*Required to proceed!";

    // const campaignForm ={
    //     "a": "ceva",
    //     "b": " CEva2"
    // }

    function validateSubmit() {
        let count = 0;
        const title = document.getElementById("name");
        if (title.value.length <= 3) {
            title.style = "border: solid 1px red;";
            document.querySelector(".title-warning").innerText = message;
            document.querySelector(".title-warning").style = "display: block;";
            count++;
        };
        const description = document.getElementById("description");
        if (description.value.length <= 3) {
            description.style = "border: solid 1px red;";
            document.querySelector(".description-warning").innerText = message;
            document.querySelector(".description-warning").style = "display: block;";
            count++;
        };
        const target = document.getElementById("targetValue");
        if (target.value < minAmount) {
            target.style = "border: solid 1px red;";
            document.querySelector(".target-warning").innerText = message;
            document.querySelector(".target-warning").style = "display: block;";
            count++;
        };
        const currency = document.getElementById("currency");
        if (currency.value == 0) {
            currency.style = "border: solid 1px red;";
            document.querySelector(".currency-warning").innerText = message;
            document.querySelector(".currency-warning").style = "display: block;";
            count++;
        }
        return count > 0 ? false : true;
    };


    async function addCampaign() {
        if (validateSubmit()) {
            await axios.post(BASE_API_URL + "campaigns/add-campaign", {
                "name": document.getElementById("name").value,
                "description": document.getElementById("description").value,
                "targetValue": document.getElementById("targetValue").value,
                "currency": document.getElementById("currency").value
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token")
                }
            })
                .then(response => {
                    console.log(response);
                })
                .finally(navigate("/campaigns"));
        }
    }

    function validateField(field) {
        if (field.id === "currency" && field.value == 0) {
            field.parentNode.parentNode.children[1].innerText = message;
            document.querySelector(".currency-warning").style = "display: block;";
            field.style = warningStyle;

        } else if (field.id === "currency" && field.value != 0) {
            field.parentNode.parentNode.children[1].innerText = message;
            document.querySelector(".currency-warning").style = "display: none;";
            field.style = normalStyle;

        } else if (field.id === "targetValue" && field.value < minAmount) {
            field.parentNode.parentNode.children[1].innerText = "Minimun 1000 amount !";
            field.parentNode.parentNode.children[1].style = "display: block;";
            field.style = warningStyle;

        } else if (field.id === "targetValue" && field.value >= minAmount) {
            field.parentNode.parentNode.children[1].style = "display: none;";
            field.style = normalStyle;

        } else if (field.value.length <= 3 && field.id !== "targetValue" && field.id !== "currency") {
            field.parentNode.parentNode.children[1].innerText = "Minimun 4 chars !"
            field.parentNode.parentNode.children[1].style = "display: block;";
            field.style = warningStyle;

        } else if (field.value.length > 3 && field.id !== "targetValue" && field.id !== "currency") {
            field.parentNode.parentNode.children[1].style = "display: none;";
            field.style = normalStyle;
        }

    }

    return (
        <div className="campaign-form-workspace">
            <form className="campaign-form">
                <div >
                    <label>Title:
                        <input onChange={() => { validateField(document.getElementById("name")) }} id="name" type="text" placeholder="Title" required autoFocus />
                    </label>
                    <div className="title-warning"></div>
                </div>
                <div className="description-label">
                    <label>Description:<br />
                        <textarea onChange={() => { validateField(document.getElementById("description")) }} cols="80" rows="10" id="description" type="text" placeholder="Description" required >
                        </textarea>
                    </label>
                    <div className="description-warning"></div>
                </div>
                <div className="target-label">
                    <label>Target:
                        <input onChange={() => { validateField(document.getElementById("targetValue")) }} id="targetValue" type="number" placeholder="Target" required />
                    </label>
                    <div className="target-warning"></div>
                </div>
                <div className="currency-label">
                    <label>Currency:<br />
                        <select onChange={() => { validateField(document.getElementById("currency")) }} id="currency">
                            <option value="0">Select Currency</option>
                            <option value="RON">Romanian Leu</option>
                            <option value="EUR">Euro</option>
                            <option value="CZK">Czech Republic Koruna</option>
                            <option value="AUD">Australian Dollar</option>
                            <option value="NZD">New Zealand Dollar</option>
                            <option value="USD">United States Dollar</option>
                        </select>
                    </label>
                    <div className="currency-warning"></div>
                </div>
                <Button variant="dark" className="submit-campaign" onClick={addCampaign}>
                    Submit
                </Button>
            </form>
        </div>
    );
};