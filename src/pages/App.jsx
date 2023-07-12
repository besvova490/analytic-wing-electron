import { BrowserRouter } from "react-router-dom";

// pages
import Router from "./router/Router";

// context
import { withUserContext } from "../context/UserContext";


function App() {
  
  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  );
}

export default withUserContext(App);
