import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PageNavBar from './navbar/navbar';
import PageFooter from './footer/footer';
import Home from './home/home';
import About from "./about/about";
import Campaigns from "./campaigns/campaignsPage";
import CampaignDetails from "./campaigns/campaignDetails";
import CampaignForm from "./campaigns/campaingForm";
import OpinionForm from "./opinion/opinionForm";


export const BASE_API_URL = "http://localhost:8080/api/";


function App() {
  return (
    <div className="App">
      <PageNavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/about_us" element={< About />} />
          <Route path="/campaigns" element={< Campaigns />}/>
          <Route path="/campaigns/campaign/:id" element={<CampaignDetails />} />
          <Route path="/campaigns/add-campaign" element={<CampaignForm />} />
          <Route path="/campaigns/campaign/:id/add-opinion" element={<OpinionForm />} />
          

        </Routes>
      </BrowserRouter>

      <PageFooter />
    </div>
  );
};

export default App;
