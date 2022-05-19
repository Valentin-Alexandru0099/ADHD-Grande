import "./opinionForm.css";
import axios from "axios";
import { BASE_API_URL } from "../App";
import { useNavigate, useParams } from "react-router";
import { Button } from "react-bootstrap";

export default function OpinionForm() {

    let navigate = useNavigate();

    const { id } = useParams();

    async function addOpinion() {
        const description = document.getElementById("description").value;
        await axios(BASE_API_URL + "campaigns/campaign/" + id + "/add-opinion", {
            "opinion": description
        })
            .then((response) => {
                console.log(response);
            })
            .finally(navigate("/campaigns/campaign/"+id));
    };

    return (
        <div className="opinion-form-workspace">
            <form>
                <label>Opinion Description:
                    <input id="description" type="text" placeholder="Enter your opinion here..." required autoFocus />
                </label><br />
                <Button variant="dark" onClick={addOpinion}>
                    Submit
                </Button>
            </form>
        </div>
    );
};