import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_API_URL } from "../App";


export default function UserPage() {

    const { id } = useParams();
    const [user, setUser] = useState("");
    const [campaignsCount, setCampignsCount] = useState(0);
    const [opinionsCount, setOpinionsCount] = useState(0);


    async function getUser() {
        await axios(BASE_API_URL + "users/user/" + id)
            .then(response => {
                setUser(response.data);
                setCampignsCount(response.data.campaignList.length);
                setOpinionsCount(response.data.opinionList.length);
            })
    };


    useEffect(() => {
        getUser();
    }, []);

    console.log(user);

    return (
        <>
            <div>
                <h3>
                    {user.username}'s Info Page
                </h3>
                <p>
                    Email: {user.email}
                </p>
                <p>
                    Campaigns opened: {campaignsCount}
                </p>
                <p>
                    Opinions shared: {opinionsCount}
                </p>
            </div>
        </>
    );
};