import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import CampaignCard from "./campaignCard";
import { useNavigate } from "react-router";
import {
  MDBBtn,
  MDBContainer,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,

} from 'mdb-react-ui-kit';


function Campaigns() {

  const addCampaignStyle = {
    marginTop: '1%',
    padding: '2%',
  }

  const [campaigns, setCampaigns] = useState([]);
  let navigate = useNavigate();

  async function getCampaignData() {
    await axios(BASE_API_URL + "campaigns")
      .then((response) => {
        setCampaigns(response.data);
      });
  }

  function redirect() {
    navigate("add-campaign");
    window.scroll(0, 0);
  }

  useEffect(() => {
    getCampaignData();
  }, [])

  return (
    <>
      <MDBContainer breakpoint="sm">

        {localStorage.getItem("userId") && (
          <div style={{ textAlign: 'center' }}>
            <MDBBtn style={addCampaignStyle} rounded color='info' onClick={redirect}> Add Campaign
            </MDBBtn>
          </div>
        )}
        <nav style={{ margin: '1%' }} aria-label='Page navigation example'>
          <MDBPagination center className='mb-0'>
            <MDBPaginationItem disabled>
              <MDBPaginationLink href='#' aria-disabled='true'>
                <span aria-hidden='true'>«</span>
              </MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink href='#'>1</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink href='#'>2</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink href='#'>3</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink href='#'><span aria-hidden='true'>»</span></MDBPaginationLink>
            </MDBPaginationItem>
          </MDBPagination>
        </nav>
        {campaigns.map(campaign => (
          <CampaignCard key={campaign.id} data={campaign} />
        ))}
        <nav style={{ margin: '1%' }} aria-label='Page navigation example'>
          <MDBPagination center className='mb-0'>
            <MDBPaginationItem disabled>
              <MDBPaginationLink href='#' aria-disabled='true'>
                <span aria-hidden='true'>«</span>
              </MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink href='#'>1</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink href='#'>2</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink href='#'>3</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink href='#'><span aria-hidden='true'>»</span></MDBPaginationLink>
            </MDBPaginationItem>
          </MDBPagination>
        </nav>
      </MDBContainer>
    </>
  );
};

export default Campaigns;