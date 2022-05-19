import { Button } from "react-bootstrap";
import "./campaignForm.css";
import axios from "axios";
import { BASE_API_URL } from "../App";
import { useNavigate } from "react-router";

export default function CampaignForm() {

    let navigate = useNavigate();

    async function addCampaign() {

        await axios.post(BASE_API_URL+"campaigns/add-campaign",{
            "name": document.getElementById("name").value,
            "description": document.getElementById("description").value,
            "targetValue": document.getElementById("targetValue").value,
            "currency": document.getElementById("currency").value
        })
        .then(response=>{
            console.log(response);
        })
        .finally(navigate("/campaigns"));

    }

    return (
        <div className="campaign-form-workspace">
            <form className="campaign-form">
                <label>Title:
                    <input id="name" type="text" placeholder="Title" required autoFocus />
                </label><br />
                <label>Description:
                    <input id="description" type="text" placeholder="Description" required />
                </label><br />
                <label>Target:
                    <input id="targetValue" type="number" placeholder="Target" required />
                </label><br />
                <label>Currency:<br/>
                    <select id="currency">
                        <option value="RON">Romanian Leu</option>
                        <option value="EUR">Euro</option>
                        <option value="CZK">Czech Republic Koruna</option>
                        <option value="AUD">Australian Dollar</option>
                        <option value="NZD">New Zealand Dollar</option>
                        <option value="USD">United States Dollar</option>
                    </select>
                </label><br />
                <Button variant="dark" className="submit-campaign" onClick={addCampaign}>
                    Submit
                </Button>
            </form>
        </div>
    );
};