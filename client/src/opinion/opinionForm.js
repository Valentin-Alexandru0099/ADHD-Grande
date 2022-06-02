import "./opinionForm.css";
import axios from "axios";
import { BASE_API_URL } from "../App";
import { useNavigate, useParams } from "react-router";
import { Button } from "react-bootstrap";

export default function OpinionForm() {

    let navigate = useNavigate();

    const { id } = useParams();

    async function addOpinion() {
        if (validateSubmit(document.getElementById("description"))) {
            const description = document.getElementById("description").value;
            await axios.post(BASE_API_URL + "opinions/add-opinion/" + id, {
                "description": description
            })
                .then((response) => {
                    console.log(response);
                })
                .finally(navigate("/campaigns/campaign/" + id));
        }
    };

    function validateField(field) {
        if (field.value.length <= 3){
            field.style = "boder: solid 1px red;"
            field.parentNode.parentNode.children[1].innerText = "Minimun 4 chars!";
            field.parentNode.parentNode.children[1].style = "display: block;";
    }else{
        field.style = "boder: solid 1px black;"
            field.parentNode.parentNode.children[1].style = "display: none;";
    }
}

    function validateSubmit(field){
        if (field.value.length <= 3){
            field.style = "boder: solid 1px red;"
            field.parentNode.parentNode.children[1].innerText = "*Required to proceed!";
            field.parentNode.parentNode.children[1].style = "display: block;";
            return false;
        }else{
            return true;
        };
    };

    return (
        <div className="opinion-form-workspace">
            <form className="opinion-form">
                <label>Opinion Description:
                    <textarea
                        rows="5"
                        cols="80"
                        onChange={() => { validateField(document.querySelector("#description")) }}
                        id="description"
                        type="text"
                        placeholder="Enter your opinion here..."
                        required
                        autoFocus >
                    </textarea>
                </label>
                <div className="opinion-warning"></div><br />

                <Button variant="dark" onClick={addOpinion}>
                    Submit
                </Button>
            </form>
        </div>
    );
};