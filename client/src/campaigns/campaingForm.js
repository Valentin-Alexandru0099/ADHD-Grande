import { Button } from "react-bootstrap";
import "./campaignForm.css";
import axios from "axios";
import { BASE_API_URL } from "../App";
import { useNavigate } from "react-router";

export default function CampaignForm() {

    let navigate = useNavigate();
    const minAmount = 1000;

    function validate() {
        let count = 0;
        const title = document.getElementById("name");
        if (title.value.length <= 0) {
            title.style = "border: solid 1px red;";
            document.querySelector(".title-warning").style = "display: block;";
            count++;
        };
        const description = document.getElementById("description");
        if (description.value.length <= 0) {
            description.style = "border: solid 1px red;";
            document.querySelector(".description-warning").style = "display: block;";
            count++;
        };
        const target = document.getElementById("targetValue");
        if (target.value < minAmount) {
            target.style = "border: solid 1px red;";
            document.querySelector(".target-warning").style = "display: block;";
            count++;
        };
        const currency = document.getElementById("currency");
        if (currency.value == 0) {
            currency.style = "border: solid 1px red;";
            document.querySelector(".currency-warning").style = "display: block;";
            count++;
        }
        return count > 0 ? false : true;
    };


    async function addCampaign() {
        if (validate()) {
            await axios.post(BASE_API_URL + "campaigns/add-campaign", {
                "name": document.getElementById("name").value,
                "description": document.getElementById("description").value,
                "targetValue": document.getElementById("targetValue").value,
                "currency": document.getElementById("currency").value
            })
                .then(response => {
                    console.log(response);
                })
                .finally(navigate("/campaigns"));
        }
    }

    return (
        <div className="campaign-form-workspace">
            <form className="campaign-form">
                <div >
                    <label>Title:
                        <input id="name" type="text" placeholder="Title" required autoFocus />
                    </label>
                    <div className="title-warning">*Required to proceed!</div>
                </div>
                <div className="description-label">
                    <label>Description:<br />
                        <textarea cols="80" rows="10" id="description" type="text" placeholder="Description" required >
                        </textarea>
                    </label>
                    <div className="description-warning">*Required to proceed!</div>
                </div>
                <div className="target-label">
                    <label>Target:
                        <input id="targetValue" type="number" placeholder="Target" required />
                    </label>
                    <div className="target-warning">*Required to proceed! Minimun amount: {minAmount}!</div>
                </div>
                <div className="currency-label">
                    <label>Currency:<br />
                        <select id="currency">
                            <option value="0">Select Currency</option>
                            <option value="RON">Romanian Leu</option>
                            <option value="EUR">Euro</option>
                            <option value="CZK">Czech Republic Koruna</option>
                            <option value="AUD">Australian Dollar</option>
                            <option value="NZD">New Zealand Dollar</option>
                            <option value="USD">United States Dollar</option>
                        </select>
                    </label>
                    <div className="currency-warning">*Required to proceed!</div>
                </div>
                <Button variant="dark" className="submit-campaign" onClick={addCampaign}>
                    Submit
                </Button>
            </form>
        </div>
    );
};