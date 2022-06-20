import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PageNavBar from './navbar/navbar';
import PageFooter from './footer/footer';
import Home from './home/home';
import About from "./about/about";
import Campaigns from "./campaign/campaignsPage";
import CampaignDetails from "./campaign/campaignDetails";
import CampaignForm from "./campaign/campaingForm";
import OpinionForm from "./opinion/opinionForm";
import RegisterForm from "./user/register";
import LoginForm from "./user/login";
import UserPage from "./user/userPage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
import PaymentPage from "./payment/payment";


export const BASE_API_URL = "http://localhost:8080/api/";


function App() {
  AOS.init();

  return (
    <div className="App">
      <PageNavBar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={< Home />} />
          <Route path="/about_us" element={< About />} />
          <Route path="/campaigns" element={< Campaigns />} />
          <Route path="/campaigns/campaign/:id" element={<CampaignDetails />} />
          <Route path="/campaigns/add-campaign" element={<CampaignForm update={false} />} />
          <Route path="/campaigns/update-campaign/:id" element={<CampaignForm update={true} />} />
          <Route path="/campaigns/campaign/:id/add-opinion" element={<OpinionForm update={false} />} />
          <Route path="/opinions/update-opinion/:opinionId" element={<OpinionForm update={true} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/campaigns/campaign/:id/payment" element={<PaymentPage />} />

        </Routes>
      </BrowserRouter>

      <PageFooter />
    </div>
  );
};

export default App;
