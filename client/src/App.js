import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PageNavBar from './navbar/navbar';
import PageFooter from './footer/footer';
import Home from './home/home';


function App() {
  return (
      <div className="App">
      <PageNavBar />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Home />}/>
        </Routes>
      </BrowserRouter>

      <PageFooter />
      </div>
    );
};

export default App;
