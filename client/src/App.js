import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PageNavBar from './navbar/navbar';
import PageFooter from './footer/footer';
import Home from './home/home';
import About from "./about/about";
import Campaigns from "./campaigns/campaigns";


function App() {
  return (
      <div className="App">
      <PageNavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Home />}/>
          <Route path="/about_us" element={< About/>}/>
          <Route path="/campaigns" element={< Campaigns/>}/>
          
        </Routes>
      </BrowserRouter>

      <PageFooter />
      </div>
    );
};

export default App;
